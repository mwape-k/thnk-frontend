import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NodeMap from "./NodeMap";
import PopoverCard from "./PopoverCard";

const COLOURS = [
  "#DA88DA",
  "#F94301",
  "#FFFF",
  "#55D657",
  "#7B8FF7",
  "#55D657",
  "#D8D115",
];

// Get a random position inside container (with margins to avoid edges)
const getRandomPosition = (width: number, height: number) => {
  const margin = 60;
  return {
    x: Math.random() * (width - margin * 2) + margin,
    y: Math.random() * (height - margin * 2) + margin,
  };
};

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
}

interface MindMapContainerProps {
  responseData?: any; // The API response data from search
  searchType?: "url" | "prompt"; // Whether this is URL or prompt response
  width?: number;
  height?: number;
  initialNodes?: MindMapNode[]; // nodes passed from navigation for deeper page
  parentLabel?: string; // parent label from deeper page if any
  parentFill?: string; // parent node fill colour to pass further down
}

const MindMapContainer: React.FC<MindMapContainerProps> = ({
  responseData = null,
  searchType = "prompt",
  width = 900,
  height = 500,
  initialNodes,
  parentLabel,
  parentFill,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Store nodes internally (either from initialNodes via navigation or from responseData)
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [popoverNode, setPopoverNode] = useState<MindMapNode | null>(null);

  // Convert API response to mind map nodes
  const convertResponseToNodes = (
    data: any,
    type: "url" | "prompt"
  ): MindMapNode[] => {
    if (!data) return [];

    if (type === "url") {
      // Handle URL response structure
      const nodes: MindMapNode[] = [];

      // Main content node
      if (data.main) {
        nodes.push({
          id: "main-content",
          label: data.main.title || "Main Content",
          fill: COLOURS[0],
          position: getRandomPosition(width, height),
          summary: data.main.text,
          neutralityScore: data.main.neutralityScore,
          sentimentScore: data.main.sentimentScore,
          tags: data.main.tags,
          url: data.main.url,
          type: "source",
        });
      }

      // AI Outline nodes (deep dive summaries)
      if (data.main?.aiOutline && Array.isArray(data.main.aiOutline)) {
        data.main.aiOutline.forEach((outline: any, index: number) => {
          nodes.push({
            id: `ai-outline-${index}`,
            label: `Summary ${index + 1}`,
            fill: COLOURS[1],
            position: getRandomPosition(width, height),
            summary: outline.summary,
            neutralityScore: outline.neutralityScore,
            sources: outline.sources,
            type: "aiOutline",
          });
        });
      }

      // Related sources
      if (data.relatedSources && Array.isArray(data.relatedSources)) {
        data.relatedSources.forEach((source: any, index: number) => {
          nodes.push({
            id: `related-source-${index}`,
            label: source.title || `Source ${index + 1}`,
            fill: COLOURS[2 + (index % (COLOURS.length - 2))],
            position: getRandomPosition(width, height),
            summary: source.text,
            neutralityScore: source.neutralityScore,
            sentimentScore: source.sentimentScore,
            tags: source.tags,
            url: source.url,
            type: "relatedSource",
          });
        });
      }

      return nodes;
    } else {
      // Handle prompt response structure
      if (data.sources && Array.isArray(data.sources)) {
        return data.sources.map((source: any, index: number) => ({
          id: `source-${index}`,
          label: source.title || `Source ${index + 1}`,
          fill: COLOURS[index % COLOURS.length],
          position: getRandomPosition(width, height),
          summary: source.text,
          neutralityScore: source.neutralityScore,
          sentimentScore: source.sentimentScore,
          tags: source.tags,
          url: source.url,
          type: "source",
        }));
      }
    }

    return [];
  };

  // On mount or responseData change, convert API response to nodes
  useEffect(() => {
    if (initialNodes && initialNodes.length > 0) {
      // Use passed nodes directly for deeper views
      const mapped = initialNodes.map((node) => ({
        ...node,
        fill:
          parentFill ||
          node.fill ||
          COLOURS[Math.floor(Math.random() * COLOURS.length)],
        position: node.position || getRandomPosition(width, height),
      }));
      setNodes(mapped);
      setPopoverNode(null);
      return;
    }

    if (responseData) {
      const convertedNodes = convertResponseToNodes(responseData, searchType);
      setNodes(convertedNodes);
      setPopoverNode(null);
    }
  }, [responseData, searchType, width, height, initialNodes, parentFill]);

  // Node click handler: navigates to deeper page or opens popover if leaf
  const handleNodeClick = (node: MindMapNode) => {
    // For now, all nodes show popover since we don't have deeper nested data
    // You can modify this based on your actual data structure
    setPopoverNode(node);

    // If you want to implement deeper navigation later:
    // if (node.sources && node.sources.length > 0) {
    //   // Navigate to deeper view with sources
    //   navigate("/Search-deeper", {
    //     state: {
    //       nodes: node.sources.map((source, index) => ({
    //         id: `source-${index}`,
    //         label: `Source ${index + 1}`,
    //         fill: node.fill,
    //         position: getRandomPosition(width, height),
    //         url: source,
    //         type: "source"
    //       })),
    //       parentLabel: node.label,
    //       fill: node.fill,
    //     },
    //   });
    // } else {
    //   setPopoverNode(node);
    // }
  };

  // Popover positioning relative to node position
  const popoverStyle = popoverNode
    ? {
        position: "absolute" as const,
        left: Math.min(popoverNode.position.x + 80, width - 300), // Keep within bounds
        top: Math.min(popoverNode.position.y, height - 400), // Keep within bounds
        zIndex: 10,
      }
    : { display: "none" };

  // Function to close popover
  const closePopOver = () => setPopoverNode(null);

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        borderRadius: 30,
      }}
    >
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
              maxWidth: "100px",
              wordWrap: "break-word",
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
