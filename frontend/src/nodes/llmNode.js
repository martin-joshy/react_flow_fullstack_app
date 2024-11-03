import { useState, useEffect, useRef, useCallback } from "react";
import { BaseNode } from "./baseNode";
import { useUpdateNodeInternals } from "reactflow";
import Textarea from "../ui_component/textarea";

export const LLMNode = ({ id, data, selected }) => {
  const updateInternals = useUpdateNodeInternals();
  const debounceTimerRef = useRef(0);
  const [inputText, setInputText] = useState("");
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const staticInputsRef = useRef([
    {
      id: `${id}-context`,
    },
    {
      id: `${id}-prompt`,
    },
  ]);
  const allInputsRef = useRef([]);

  const outputs = [
    {
      id: `${id}-response`,
    },
  ];

  const processDynamicInputs = useCallback(() => {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = [...inputText.matchAll(variableRegex)];
    const newInputs = matches.map((match) => ({
      id: `${id}-${match[1].trim()}`,
    }));

    setDynamicInputs(newInputs);
    allInputsRef.current = [...staticInputsRef.current, ...dynamicInputs];
    updateInternals(id);
  }, [inputText, id, updateInternals, dynamicInputs]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const maxHeight = 200;
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      processDynamicInputs();
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText, processDynamicInputs]);

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={allInputsRef.current}
      outputs={outputs}
      selected={selected}
    >
      <div className="flex flex-col w-full space-y-2">
        <span className="text-sm">This is a LLM.</span>
        <div className="relative w-full">
          <Textarea
            onChange={handleInputChange}
            placeholder="Enter your prompt..."
            value={inputText}
          />
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode;
