import React, { useState } from "react";
import NodeMap from "./NodeMap";
import PopoverCard from "./PopoverCard";

interface NodeData {
  id: string;
  label: string;
  children?: NodeData[];
}

const dummyData: NodeData[] = [
  {
    id: "1",
    label: "Root Node",
    children: [
      {
        id: "2",
        label: "Child Node 1",
        // no children: leaf node
      },
      {
        id: "3",
        label: "Child Node 2",
        children: [
          {
            id: "4",
            label: "Grandchild Node (Won't expand further)",
          },
        ],
      },
    ],
  },
];

function MindMapContainer() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [showPopoverFor, setShowPopoverFor] = useState<string | null>(null);

  const toggleExpandNode = (node: NodeData) => {
    if (!node.children || node.children.length === 0) {
      // Leaf node: toggle popover
      setShowPopoverFor((prev) => (prev === node.id ? null : node.id));
    } else {
      // Non-leaf node: toggle expand/collapse children
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(node.id)) {
          newSet.delete(node.id);
        } else {
          newSet.add(node.id);
        }
        return newSet;
      });
      // Also hide popover if any
      setShowPopoverFor(null);
    }
  };

  const renderNode = (node: NodeData, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} style={{ marginLeft: level * 20 }}>
        <NodeMap
          onClick={() => toggleExpandNode(node)}
          className="cursor-pointer"
        />
        <span className="ml-2 text-white">{node.label}</span>

        {/* Show children if expanded */}
        {isExpanded &&
          node.children &&
          node.children.map((child) => renderNode(child, level + 1))}

        {/* Show popover card only for leaf node if toggled */}
        {!node.children && showPopoverFor === node.id && (
          <PopoverCard className="mt-2" />
        )}
      </div>
    );
  };

  return <div>{dummyData.map((node) => renderNode(node))}</div>;
}

export default MindMapContainer;
