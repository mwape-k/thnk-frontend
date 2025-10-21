import { Circle } from "lucide-react";
import "../components/component-styles/styles-nodeMap.css";

interface NodeMapProps {
  onClick: () => void;
  className?: string;
  fill?: string;
  color?: string;
}

function NodeMap({
  onClick,
  fill = "#fff",
  color = "#fff",
  className = "",
}: NodeMapProps) {
  return (
    <div
      className={`node-outer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <Circle fill={fill} color={color} />
    </div>
  );
}

export default NodeMap;
