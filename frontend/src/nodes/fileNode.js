import { BaseNode } from "./baseNode";

export const FileNode = ({ id, selected }) => {
  const outputs = [
    {
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="File"
      outputs={outputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <p>Select a file</p>
    </BaseNode>
  );
};
