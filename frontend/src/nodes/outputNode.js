// outputNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";
import Select from "../ui_component/select";
import Textarea from "../ui_component/textarea";

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [
    {
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={inputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <label>
        Name:
        <Textarea value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <Select
          options={[
            { value: "Text", label: "Text" },
            { value: "File", label: "Image" },
          ]}
          value={outputType}
          onChange={handleTypeChange}
        />
      </label>
    </BaseNode>
  );
};
