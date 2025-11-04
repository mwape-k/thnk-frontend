import React, { useEffect, useState, useRef, useCallback } from "react";
//import { useNavigate, useLocation } from "react-router-dom";
import NodeMap from "./NodeMap";
import PopoverCard from "./PopoverCard";
import type { EnhancedSearchResponse } from "../services/searchService";

const COLOURS = [
  "#DA88DA",
  "#F94301",
  "#FFFF",
  "#55D657",
  "#7B8FF7",
  "#55D657",
  "#D8D115",
];

// More flexible node dimensions for collision detection
const NODE_WIDTH = 100; // Approximate visual width
const NODE_HEIGHT = 80; // Approximate visual height
const NODE_MARGIN = 50; // Space between nodes

interface MindMapNode {
  id: string;
  label: string;
  fill: string;
  position: { x: number; y: number };
  summary?: string;
  neutralityScore?: number;
  persuasionScore?: number;
  sentimentScore?: number;
  tags?: string[];
  url?: string;
  sources?: string[];
  deeper?: MindMapNode[];
  type?: "source" | "aiOutline" | "relatedSource";
  // Enhanced fields for bias analysis
  biasAnalysis?: any;
  sourceMetrics?: any;
  researchQuality?: any;
  quickAssessment?: any;
}

interface MindMapContainerProps {
  responseData?: EnhancedSearchResponse | null;
  searchType?: "url" | "prompt";
  width?: number | "auto";
  height?: number | "auto";
  initialNodes?: MindMapNode[];
  //parentLabel?: string;
  parentFill?: string;
  className?: string;
}

const MindMapContainer: React.FC<MindMapContainerProps> = ({
  responseData = null,
  searchType = "prompt",
  width = "auto",
  height = "auto",
  initialNodes,
  //parentLabel,
  parentFill,
  className = "",
}) => {
  //const navigate = useNavigate();
  //const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerSize, setContainerSize] = useState({
    width: 900,
    height: 500,
  });
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [popoverNode, setPopoverNode] = useState<MindMapNode | null>(null);

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && (width === "auto" || height === "auto")) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerSize({
          width:
            width === "auto" ? Math.max(clientWidth, 400) : (width as number), // Minimum width
          height:
            height === "auto"
              ? Math.max(clientHeight, 300)
              : (height as number), // Minimum height
        });
      } else {
        setContainerSize({
          width: width as number,
          height: height as number,
        });
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, height]);

  const actualWidth = width === "auto" ? containerSize.width : width;
  const actualHeight = height === "auto" ? containerSize.height : height;

  // Check if two nodes overlap
  const nodesOverlap = useCallback(
    (node1: MindMapNode, node2: MindMapNode): boolean => {
      const horizontalOverlap =
        Math.abs(node1.position.x - node2.position.x) <
        NODE_WIDTH + NODE_MARGIN;
      const verticalOverlap =
        Math.abs(node1.position.y - node2.position.y) <
        NODE_HEIGHT + NODE_MARGIN;

      return horizontalOverlap && verticalOverlap;
    },
    []
  );

  // Check if node is within container bounds
  const isWithinBounds = useCallback(
    (position: { x: number; y: number }): boolean => {
      const margin = NODE_MARGIN;
      return (
        position.x >= margin &&
        position.x <= actualWidth - NODE_WIDTH - margin &&
        position.y >= margin &&
        position.y <= actualHeight - NODE_HEIGHT - margin
      );
    },
    [actualWidth, actualHeight]
  );

  // Generate a valid position that doesn't overlap with existing nodes and is within bounds
  const getValidPosition = useCallback(
    (existingNodes: MindMapNode[]): { x: number; y: number } => {
      const margin = NODE_MARGIN;
      const maxAttempts = 50; // Reduced attempts for performance

      // If no existing nodes, return a random position
      if (existingNodes.length === 0) {
        return {
          x: margin + Math.random() * (actualWidth - 2 * margin - NODE_WIDTH),
          y: margin + Math.random() * (actualHeight - 2 * margin - NODE_HEIGHT),
        };
      }

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const position = {
          x: margin + Math.random() * (actualWidth - 2 * margin - NODE_WIDTH),
          y: margin + Math.random() * (actualHeight - 2 * margin - NODE_HEIGHT),
        };

        // Check if position is valid (within bounds and no overlaps)
        if (isWithinBounds(position)) {
          const overlaps = existingNodes.some((existingNode) =>
            nodesOverlap({ ...existingNode, position }, existingNode)
          );

          if (!overlaps) {
            return position;
          }
        }
      }

      // If no valid position found, use a simple spiral pattern from center
      const centerX = actualWidth / 2;
      const centerY = actualHeight / 2;

      for (
        let radius = 0;
        radius < Math.min(actualWidth, actualHeight) / 2;
        radius += NODE_MARGIN
      ) {
        for (let angle = 0; angle < 360; angle += 30) {
          const rad = (angle * Math.PI) / 180;
          const position = {
            x: centerX + radius * Math.cos(rad) - NODE_WIDTH / 2,
            y: centerY + radius * Math.sin(rad) - NODE_HEIGHT / 2,
          };

          if (isWithinBounds(position)) {
            const overlaps = existingNodes.some((existingNode) =>
              nodesOverlap({ ...existingNode, position }, existingNode)
            );

            if (!overlaps) {
              return position;
            }
          }
        }
      }

      // Ultimate fallback - use the center
      return {
        x: Math.max(margin, (actualWidth - NODE_WIDTH) / 2),
        y: Math.max(margin, (actualHeight - NODE_HEIGHT) / 2),
      };
    },
    [actualWidth, actualHeight, isWithinBounds, nodesOverlap]
  );

  // Convert API response to mind map nodes with valid positions
  const convertResponseToNodes = useCallback(
    (
      data: EnhancedSearchResponse | null,
      _type: "url" | "prompt"
    ): MindMapNode[] => {
      if (!data) return [];

      const nodes: MindMapNode[] = [];

      // Both search types now use the same enhanced structure
      if (data.sources && Array.isArray(data.sources)) {
        data.sources.forEach((source: any, index: number) => {
          nodes.push({
            id: `source-${index}`,
            label: source.title || `Source ${index + 1}`,
            fill: COLOURS[index % COLOURS.length],
            position: getValidPosition(nodes),
            summary: source.text,
            neutralityScore: source.neutralityScore,
            sentimentScore: source.sentimentScore,
            tags: source.tags,
            url: source.url,
            type: "source",
            // Pass enhanced data to each node for the popover
            biasAnalysis: data.biasAnalysis,
            sourceMetrics: data.sourceMetrics,
            researchQuality: data.researchQuality,
            quickAssessment: data.quickAssessment,
          });
        });
      }

      return nodes;
    },
    [getValidPosition]
  );

  // On mount or responseData change, convert API response to nodes
  useEffect(() => {
    if (initialNodes && initialNodes.length > 0) {
      // Ensure initial nodes have valid positions
      const nodesWithValidPositions: MindMapNode[] = [];
      initialNodes.forEach((node) => {
        const validPosition = getValidPosition(nodesWithValidPositions);
        nodesWithValidPositions.push({
          ...node,
          fill:
            parentFill ||
            node.fill ||
            COLOURS[Math.floor(Math.random() * COLOURS.length)],
          position:
            node.position && isWithinBounds(node.position)
              ? node.position
              : validPosition,
        });
      });
      setNodes(nodesWithValidPositions);
      setPopoverNode(null);
      return;
    }

    if (responseData) {
      const convertedNodes = convertResponseToNodes(responseData, searchType);
      setNodes(convertedNodes);
      setPopoverNode(null);
    } else {
      // If no response data, set empty nodes to clear previous state
      setNodes([]);
    }
  }, [
    responseData,
    searchType,
    initialNodes,
    parentFill,
    convertResponseToNodes,
    getValidPosition,
    isWithinBounds,
  ]);

  // Debug: Log nodes when they change
  useEffect(() => {
    console.log("Nodes updated:", nodes.length, nodes);
  }, [nodes]);

  // Node click handler
  const handleNodeClick = (node: MindMapNode) => {
    setPopoverNode(node);
  };

  // Popover positioning with boundary checks
  const popoverStyle = popoverNode
    ? {
        position: "absolute" as const,
        left: Math.max(
          NODE_MARGIN,
          Math.min(popoverNode.position.x + 80, actualWidth - 320)
        ),
        top: Math.max(
          NODE_MARGIN,
          Math.min(popoverNode.position.y, actualHeight - 400)
        ),
        zIndex: 10,
      }
    : { display: "none" };

  const closePopOver = () => setPopoverNode(null);

  const containerStyle = {
    width: width === "auto" ? "100%" : width,
    height: height === "auto" ? "100%" : height,
    minWidth: width === "auto" ? "400px" : width, // Ensure minimum width
    minHeight: height === "auto" ? "450px" : height, // Ensure minimum height
    position: "relative" as const,
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={containerStyle}
    >
      {/* Debug info */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          No nodes to display
        </div>
      )}

      {/* Scatter nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          style={{
            position: "absolute",
            left: node.position.x,
            top: node.position.y,
            zIndex: 3,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NodeMap
            fill={node.fill}
            color="#10131b"
            onClick={() => handleNodeClick(node)}
          />
          <div
            style={{
              color: node.fill,
              textAlign: "center",
              fontWeight: 700,
              fontSize: "12px",
              maxWidth: "120px",
              wordWrap: "break-word",
              marginTop: "8px",
              padding: "2px 6px",
            }}
          >
            {node.label}
          </div>
        </div>
      ))}

      {/* Show popover for clicked nodes */}
      {popoverNode && (
        <div style={popoverStyle}>
          <PopoverCard onClose={closePopOver} nodeData={popoverNode} />
        </div>
      )}
    </div>
  );
};

export default MindMapContainer;
