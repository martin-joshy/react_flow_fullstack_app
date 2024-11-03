// textNode.js

import { BaseNode } from "./baseNode";

export const NotionNode = ({ id, selected }) => {
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
      title="Notion"
      outputs={outputs}
      inputs={inputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <p>This is a Notion DB</p>
    </BaseNode>
  );
};
