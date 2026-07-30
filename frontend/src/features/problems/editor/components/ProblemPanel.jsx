const fallbackProblem = {
  title: 'Two Sum',
  difficultyLevelName: 'Easy',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  constraints:
    '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.',
  examples: [
    {
      displayOrder: 1,
      input: 'nums = [2,7,11,15]\ntarget = 9',
      output: '[0,1]',
    },
  ],
};

const difficultyClassName = {
  Easy: 'bg-green-600',
  Medium: 'bg-yellow-600',
  Hard: 'bg-red-600',
};

const ProblemPanel = ({ problem }) => {
  const currentProblem = problem ?? fallbackProblem;

  return (
    <div className="rounded-md border border-gray-600 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">
          {currentProblem.title}
        </h2>

        <span
          className={`rounded-md px-4 py-1 text-sm font-medium text-white ${
            difficultyClassName[currentProblem.difficultyLevelName] ??
            'bg-gray-600'
          }`}
        >
          {currentProblem.difficultyLevelName}
        </span>
      </div>

      <hr className="my-5 border-gray-600" />

      <h3 className="mb-3 text-lg font-semibold text-orange-400">
        Problem Statement
      </h3>

      <p className="leading-8 text-gray-300">{currentProblem.description}</p>

      <hr className="my-5 border-gray-600" />

      <h3 className="mb-3 text-lg font-semibold text-orange-400">Example</h3>

      <div className="space-y-4">
        {currentProblem.examples?.map((example) => (
          <pre
            className="overflow-x-auto rounded-md border border-gray-700 bg-gray-900 p-4 text-sm leading-7 text-gray-200"
            key={example.displayOrder}
          >
            {`Input:
${example.input}

Output:
${example.output}${
              example.explanation
                ? `

Explanation:
${example.explanation}`
                : ''
            }`}
          </pre>
        ))}
      </div>

      <hr className="my-5 border-gray-600" />

      <h3 className="mb-3 text-lg font-semibold text-orange-400">
        Constraints
      </h3>

      <pre className="text-sm leading-7 whitespace-pre-wrap text-gray-300">
        {currentProblem.constraints}
      </pre>
    </div>
  );
};

export default ProblemPanel;
