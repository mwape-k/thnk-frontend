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

// Dummy async fetch function mimics API call with delay
const fetchMindMapData = async (promptOrUrl: string) => {
  await new Promise((res) => setTimeout(res, 250));
  return [
    {
      id: "source-1",
      label: "Source 1",
      summary: "Summary for Source 1",
      neutrality: "Neutral",
      persuasion: "Low",
      deeper: [
        {
          id: "deeper-1a",
          label: "Related A",
          summary: "Summary for Related A",
          neutrality: "Neutral",
          persuasion: "Medium",
        },
        {
          id: "deeper-1b",
          label: "Related B",
          summary: "Summary for Related B",
          neutrality: "Biased",
          persuasion: "High",
        },
      ],
    },
    {
      id: "source-2",
      label: "Source 2",
      summary: "Summary for Source 2",
      neutrality: "Biased",
      persuasion: "Medium",
      deeper: [],
    },
    {
      id: "source-3",
      label: "Source 3",
      summary: "Summary for Source 3",
      neutrality: "Very Neutral",
      persuasion: "Low",
    },
    {
      id: "source-4",
      label: "Source 4",
      summary: "Summary for Source 4",
      neutrality: "Persuasive",
      persuasion: "Extreme",
      deeper: [
        {
          id: "deeper-4a",
          label: "Related D1",
          summary: "Summary for D1",
          neutrality: "Neutral",
          persuasion: "Medium",
        },
      ],
    },
  ];
};

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
  neutrality?: string;
  persuasion?: string;
  deeper?: MindMapNode[];
}

interface MindMapContainerProps {
  promptOrUrl?: string; // optional to accept preset nodes via location state
  width?: number;
  height?: number;
  initialNodes?: MindMapNode[]; // nodes passed from navigation for deeper page
  parentLabel?: string; // parent label from deeper page if any
  parentFill?: string; // parent node fill colour to pass further down
}

const MindMapContainer: React.FC<MindMapContainerProps> = ({
  promptOrUrl = "",
  width = 900,
  height = 500,
  initialNodes,
  parentLabel,
  parentFill,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Store nodes internally (either from initialNodes via navigation or fetched)
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [popoverNode, setPopoverNode] = useState<MindMapNode | null>(null);

  // On mount or prompt change, if no preset nodes, fetch data from dummy fetch
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

    // Fetch dummy data
    setPopoverNode(null);

    fetchMindMapData(promptOrUrl).then((sources) => {
      // Filter out duplicate labels on first level
      const seenLabels = new Set();
      const usedColours = new Set<string>();

      const uniqueSources = sources.filter((source) => {
        if (seenLabels.has(source.label)) {
          return false;
        } else {
          seenLabels.add(source.label);
          return true;
        }
      });

      // Process only unique sources
      const processedNodes = uniqueSources.map((node) => {
        // Pick a unique colour for this node
        let availableColours = COLOURS.filter((c) => !usedColours.has(c));
        if (availableColours.length === 0) {
          // If exhausted all colours, reset or pick random (here resets)
          usedColours.clear();
          availableColours = [...COLOURS];
        }
        const chosenColour =
          availableColours[Math.floor(Math.random() * availableColours.length)];
        usedColours.add(chosenColour);

        return {
          ...node,
          fill: chosenColour,
          position: getRandomPosition(width, height),
          deeper: node.deeper
            ? node.deeper.map((deepNode: any) => ({
                ...deepNode,
                fill: chosenColour, // inherit parent's fill colour
                position: getRandomPosition(width, height),
              }))
            : [],
        };
      });

      setNodes(processedNodes);
    });
  }, [promptOrUrl, width, height, initialNodes, parentFill]);

  // Node click handler: navigates to deeper page or opens popover if leaf
  const handleNodeClick = (node: MindMapNode) => {
    if (node.deeper && node.deeper.length > 0) {
      // Nodes with deeper data: prepare nodes with parent fill colour and random positions
      const scatteredChildren = node.deeper.map((deep) => ({
        ...deep,
        fill: node.fill,
        position: getRandomPosition(width, height),
      }));

      // Navigate passing children nodes, parent label and fill
      navigate("/Search-deeper", {
        state: {
          nodes: scatteredChildren,
          parentLabel: node.label,
          fill: node.fill,
        },
      });
    } else {
      // Leaf nodes: show popover with the node info
      setPopoverNode(node);
    }
  };

  // Popover positioning relative to node position
  const popoverStyle = popoverNode
    ? {
        position: "absolute" as const,
        left: popoverNode.position.x + 80,
        top: popoverNode.position.y,
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
            style={{ color: node.fill, textAlign: "center", fontWeight: 700 }}
          >
            {node.label}
          </div>
        </div>
      ))}

      {/* Show popover only for leaf nodes */}
      {popoverNode && (
        <div style={popoverStyle}>
          <PopoverCard onClose={closePopOver} />
        </div>
      )}
    </div>
  );
};

export default MindMapContainer;
