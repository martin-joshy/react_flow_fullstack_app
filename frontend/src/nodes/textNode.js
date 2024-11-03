// textNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";
import Textarea from "../ui_component/textarea";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const outputs = [
    {
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      outputs={outputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <label>
        Text:
        <Textarea value={currText} onChange={handleTextChange} />
      </label>
    </BaseNode>
  );
};
