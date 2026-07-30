import { useState } from 'react';

const fallbackTestCases = [
  {
    input: `nums = [2,7,11,15]
target = 9`,
    expectedOutput: `[0,1]`,
  },
  {
    input: `nums = [3,2,4]
target = 6`,
    expectedOutput: `[1,2]`,
  },
];

const TestCases = ({ testCases = [] }) => {
  const visibleCases = testCases.length > 0 ? testCases : fallbackTestCases;
  const [activeCase, setActiveCase] = useState(0);

  const currentCase = visibleCases[activeCase] ?? visibleCases[0];

  return (
    <div className="border-border bg-surface rounded-md border p-5">
      <div className="border-border mb-4 flex gap-2 border-b pb-3">
        {visibleCases.map((_, index) => (
          <button
            className={`rounded-md px-4 py-2 transition ${
              activeCase === index
                ? 'bg-primary text-white'
                : 'bg-background text-text-muted hover:text-primary'
            }`}
            key={index}
            onClick={() => setActiveCase(index)}
            type="button"
          >
            Case {index + 1}
          </button>
        ))}
      </div>

      <h3 className="text-primary mb-2 font-semibold">Input</h3>

      <pre className="border-border bg-background text-text-muted mb-5 rounded-md border p-3">
        {currentCase.input}
      </pre>

      <h3 className="text-primary mb-2 font-semibold">Expected Output</h3>

      <pre className="border-border bg-background text-text-muted rounded-md border p-3">
        {currentCase.expectedOutput ?? currentCase.output}
      </pre>
    </div>
  );
};

export default TestCases;
