// components/DitherBackground.tsx
import React, { useRef, useEffect, useCallback } from "react";

interface ClickEvent {
  position: [number, number];
  time: number;
}

const DitherBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const clicksRef = useRef<ClickEvent[]>([]);
  const MAX_CLICKS = 10;

  // Vertex Shader
  const vertexShaderSource = `#version 300 es
    in vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  // Fragment Shader (adapted from your code)
  const fragmentShaderSource = `#version 300 es
    precision highp float;
    
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uClickPositions[${MAX_CLICKS}];
    uniform float uClickTimes[${MAX_CLICKS}];
    
    out vec4 fragColor;
    
    const float PIXEL_SIZE = 4.0;
    const float CELL_PIXEL_SIZE = 8.0 * PIXEL_SIZE;
    
    // Bayer matrix helpers
    float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2.0 + a.y * a.y * 0.75);
    }
    
    #define Bayer4(a) (Bayer2(0.5*(a))*0.25 + Bayer2(a))
    #define Bayer8(a) (Bayer4(0.5*(a))*0.25 + Bayer2(a))
    
    void main() {
        float pixelSize = PIXEL_SIZE;
        vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
        
        // Calculate the UV coordinates for the grid
        float aspectRatio = uResolution.x / uResolution.y;
        
        vec2 pixelId = floor(fragCoord / pixelSize);
        vec2 pixelUV = fract(fragCoord / pixelSize); 
        
        float cellPixelSize = 8.0 * pixelSize;
        vec2 cellId = floor(fragCoord / cellPixelSize);
        vec2 cellCoord = cellId * cellPixelSize;
        
        vec2 uv = ((cellCoord / (uResolution))) * vec2(aspectRatio, 1.0);
        
        float feed = 0.0;
        
        const float speed = 0.30;
        const float thickness = 0.10;
        const float dampT = 1.0;
        const float dampR = 1.0;
        
        for (int i = 0; i < ${MAX_CLICKS}; ++i) {
            vec2 pos = uClickPositions[i];
            if(pos.x < 0.0 && pos.y < 0.0) continue;
            
            vec2 cuv = (((pos - uResolution * 0.5 - cellPixelSize * 0.5) / (uResolution))) * vec2(aspectRatio, 1.0);
            
            float t = max(uTime - uClickTimes[i], 0.0);
            float r = distance(uv, cuv);
            
            float waveR = speed * t;
            float ring = exp(-pow((r - waveR) / thickness, 2.0));
            float atten = exp(-dampT * t) * exp(-dampR * r);
            
            feed = max(feed, ring * atten);
        }
        
        float bayerValue = Bayer8(fragCoord / pixelSize) - 0.5;
        float bw = step(0.5, feed + bayerValue);
        
        fragColor = vec4(vec3(bw), 1.0);
    }
  `;

  const compileShader = (
    gl: WebGL2RenderingContext,
    source: string,
    type: number
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createProgram = (
    gl: WebGL2RenderingContext,
    vsSource: string,
    fsSource: string
  ): WebGLProgram | null => {
    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL 2 not supported");
      return;
    }

    glRef.current = gl;

    // Create shader program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    // Set up vertex data for a full-screen quad
    const vertices = new Float32Array([
      -1,
      -1, // bottom left
      1,
      -1, // bottom right
      -1,
      1, // top left
      1,
      1, // top right
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "aPosition"
    );
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      "uResolution"
    );
    const timeUniformLocation = gl.getUniformLocation(program, "uTime");
    const clickPositionsUniformLocation = gl.getUniformLocation(
      program,
      "uClickPositions"
    );
    const clickTimesUniformLocation = gl.getUniformLocation(
      program,
      "uClickTimes"
    );

    const resize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = () => {
      if (!gl || !program) return;

      resize();

      const currentTime = (Date.now() - startTimeRef.current) / 1000;

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      // Set uniforms
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, currentTime);

      // Set click positions and times
      const clickPositions = new Float32Array(MAX_CLICKS * 2);
      const clickTimes = new Float32Array(MAX_CLICKS);

      clicksRef.current.forEach((click, index) => {
        if (index < MAX_CLICKS) {
          clickPositions[index * 2] = click.position[0];
          clickPositions[index * 2 + 1] = click.position[1];
          clickTimes[index] = click.time;
        }
      });

      // Fill remaining slots with invalid positions
      for (let i = clicksRef.current.length; i < MAX_CLICKS; i++) {
        clickPositions[i * 2] = -1.0;
        clickPositions[i * 2 + 1] = -1.0;
        clickTimes[i] = 0.0;
      }

      gl.uniform2fv(clickPositionsUniformLocation, clickPositions);
      gl.uniform1fv(clickTimesUniformLocation, clickTimes);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    // Handle clicks
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cssX = e.clientX - rect.left;
      const cssY = e.clientY - rect.top;

      // Convert to framebuffer coordinates (flip Y)
      const fragX = (cssX * canvas.width) / rect.width;
      const fragY = canvas.height - (cssY * canvas.height) / rect.height;

      const currentTime = (Date.now() - startTimeRef.current) / 1000;

      // Add new click and maintain max count
      clicksRef.current.unshift({
        position: [fragX, fragY],
        time: currentTime,
      });

      if (clicksRef.current.length > MAX_CLICKS) {
        clicksRef.current = clicksRef.current.slice(0, MAX_CLICKS);
      }
    };

    canvas.addEventListener("click", handleClick);
    resize();
    render();

    // Cleanup function
    return () => {
      canvas.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteBuffer(vertexBuffer);
      if (vao) gl.deleteVertexArray(vao);
    };
  }, []);

  useEffect(() => {
    const cleanup = initWebGL();
    return cleanup;
  }, [initWebGL]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full fixed top-0 left-0 -z-10"
      style={{ display: "block" }}
    />
  );
};

export default DitherBackground;
