import { useState } from "react";
import { runCode } from "../services/editor.service";

const ActionButtons = ({
  problemId,
  programmingLanguageId,
  sourceCode,
  customInput = "",
  onRunResult,
}) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    // Validate Problem ID
    if (!problemId) {
      alert("Problem ID is missing.");
      return;
    }

    // Validate Programming Language
    if (!programmingLanguageId) {
      alert("Programming language is not selected.");
      return;
    }

    // Validate Source Code
    if (!sourceCode || !sourceCode.trim()) {
      alert("Please enter some code.");
      return;
    }

    setIsRunning(true);

    const payload = {
      problemId,
      programmingLanguageId,
      sourceCode,
      customInput,
    };

    console.log("Run Code Payload:", payload);

    try {
      // Call .NET backend
      const result = await runCode(payload);

      console.log("Run Code Result:", result);

      // Send result to SplitLayout -> TestResults
      if (onRunResult) {
        onRunResult(result);
      }
    } catch (error) {
      console.error("Run Code Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        error.message ||
        "Unable to execute code.";

      if (onRunResult) {
        onRunResult({
          isSuccess: false,
          isAccepted: false,
          status: "Execution Failed",
          standardOutput: "",
          standardError: errorMessage,
          compilationOutput: null,
          executionTimeInMilliseconds: null,
          memoryUsedInKilobytes: null,
          errorMessage,
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      
      {/* Run Button */}
      <button
        type="button"
        onClick={handleRun}
        disabled={isRunning}
        className="
          px-6 py-2
          bg-green-600
          hover:bg-green-700
          disabled:bg-gray-500
          disabled:cursor-not-allowed
          text-white
          rounded-md
          font-medium
          transition-all
          duration-200
          active:scale-95
          shadow-md
        "
      >
        {isRunning ? "⏳ Running..." : "▶ Run"}
      </button>

      {/* Submit Button */}
      <button
        type="button"
        className="
          px-6 py-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          rounded-md
          font-medium
          transition-all
          duration-200
          active:scale-95
          shadow-md
        "
      >
        ✓ Submit
      </button>

    </div>
  );
};

export default ActionButtons;