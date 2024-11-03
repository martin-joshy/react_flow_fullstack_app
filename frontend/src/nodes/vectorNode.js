import { BaseNode } from "./baseNode";

export const VectorNode = ({ id, selected }) => {
  const inputs = [
    {
      id: `${id}-query`,
    },
  ];
  const outputs = [
    {
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="VectorDB"
      outputs={outputs}
      inputs={inputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <p>This is a Vector DB</p>
    </BaseNode>
  );
};
