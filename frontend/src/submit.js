// submit.js

import { useState } from "react";
import { useReactFlow } from "reactflow";
import { Panel } from "reactflow";
import { CheckCircle, XCircle, X } from "lucide-react";

export const SubmitButton = () => {
  const instance = useReactFlow();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(null);

  const handleClose = () => {
    setAnalysisResult(null);
    setShowSuccess(false);
    setShowError(false);
    if (successTimeout) clearTimeout(successTimeout);
    if (errorTimeout) clearTimeout(errorTimeout);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    handleClose(); // Clear any existing notifications

    try {
      const nodes = instance.getNodes();
      const edges = instance.getEdges();

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error("Failed to fetch analysis result");

      const data = await response.json();
      setAnalysisResult(data);
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 10000);
      setSuccessTimeout(timeout);
    } catch (error) {
      setShowError(true);
      const timeout = setTimeout(() => setShowError(false), 3000);
      setErrorTimeout(timeout);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Panel position="bottom-center">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Panel>
      {showSuccess && (
        <div className="fixed top-0 right-0 m-8 p-4 flex items-start justify-between bg-white border border-green-200 shadow-md rounded-lg animate-fade-in">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Success</h4>
              <div className="mt-1 text-sm text-gray-600">
                <p>Number of nodes: {analysisResult.num_nodes}</p>
                <p>Number of edges: {analysisResult.num_edges}</p>
                <p>Is DAG: {analysisResult.is_dag ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      {showError && (
        <div className="fixed top-0 right-0 m-8 flex items-center gap-3 p-3 bg-red-50 text-red-800 rounded-md">
          <XCircle className="h-5 w-5" />
          <p className="text-sm">
            An error occurred while processing your request.
          </p>
        </div>
      )}
    </>
  );
};
