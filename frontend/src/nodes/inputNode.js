// inputNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";
import { FormField } from "./formField";
import Select from "../ui_component/select";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputs = [
    {
      id: `${id}-value`,
      style: {
        backgroundColor: "#4CAF50",
      },
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={outputs}
      selected={selected}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <FormField label="Name">
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ width: "100%" }}
        />
      </FormField>

      <Select
        value={inputType}
        onChange={handleTypeChange}
        options={[
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ]}
      />
    </BaseNode>
  );
};
