// draggableNode.js

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  FileText,
  MessageSquare,
  DatabaseZap,
  BookHeart,
  FolderClosed,
} from "lucide-react";

const iconMap = {
  customInput: ArrowLeftToLine,
  customOutput: ArrowRightToLine,
  text: FileText,
  llm: MessageSquare,
  vectordb: DatabaseZap,
  notion: BookHeart,
  llm2: MessageSquare,
  file: FolderClosed,
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const Icon = iconMap[type];

  return (
    <div
      className="flex h-20 w-20 cursor-grab flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-purple-200 hover:bg-purple-50"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div className="mb-2 rounded-lg p-2 text-purple-600">
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
};
