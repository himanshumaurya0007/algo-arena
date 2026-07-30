const ProblemPanel = () => {
  return (
    <div className="border border-gray-600 rounded-md p-8">

      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">
          Two Sum
        </h2>

        <span className="bg-green-600 text-white px-4 py-1 rounded-md text-sm font-medium">
          Easy
        </span>
      </div>

      <hr className="my-5 border-gray-600" />

      {/* Problem Statement */}
      <h3 className="text-lg font-semibold text-orange-400 mb-3">
        Problem Statement
      </h3>

      <p className="text-gray-300 leading-8">
        Given an array of integers <strong>nums</strong> and an integer{" "}
        <strong>target</strong>, return indices of the two numbers such that
        they add up to target.
      </p>

      <hr className="my-5 border-gray-600" />

      {/* Example */}
      <h3 className="text-lg font-semibold text-orange-400 mb-3">
        Example
      </h3>

      <pre className="bg-gray-900 border border-gray-700 rounded-md p-4 text-sm leading-7 overflow-x-auto">
{`Input:
nums = [2,7,11,15]
target = 9

Output:
[0,1]`}
      </pre>

      <hr className="my-5 border-gray-600" />

      {/* Constraints */}
      <h3 className="text-lg font-semibold text-orange-400 mb-3">
        Constraints
      </h3>

      <ul className="list-disc ml-6 space-y-2 text-gray-300">
        <li>2 ≤ nums.length ≤ 10⁴</li>
        <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
        <li>Only one valid answer exists.</li>
      </ul>

    </div>
  );
};

export default ProblemPanel;