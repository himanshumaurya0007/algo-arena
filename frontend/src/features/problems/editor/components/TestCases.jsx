import { useState } from "react";

const testCases = [
  {
    input: `nums = [2,7,11,15]
target = 9`,
    output: `[0,1]`,
  },
  {
    input: `nums = [3,2,4]
target = 6`,
    output: `[1,2]`,
  },
  {
    input: `nums = [3,3]
target = 6`,
    output: `[0,1]`,
  },
];

const TestCases = () => {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="border border-gray-600 rounded-md p-5">

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-600 pb-3">

        {testCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCase(index)}
            className={`px-4 py-2 rounded-md transition ${
              activeCase === index
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Case {index + 1}
          </button>
        ))}

      </div>

      {/* Input */}
      <h3 className="text-orange-400 font-semibold mb-2">
        Input
      </h3>

      <pre className="bg-gray-900 border border-gray-700 rounded-md p-3 mb-5">
        {testCases[activeCase].input}
      </pre>

      {/* Expected Output */}
      <h3 className="text-orange-400 font-semibold mb-2">
        Expected Output
      </h3>

      <pre className="bg-gray-900 border border-gray-700 rounded-md p-3">
        {testCases[activeCase].output}
      </pre>

    </div>
  );
};

export default TestCases;