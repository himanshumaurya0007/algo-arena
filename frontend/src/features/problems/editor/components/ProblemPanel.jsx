const ProblemPanel = () => {
  return (
    <div className="border rounded-lg p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">
        Two Sum
      </h2>

      <div className="mb-4">
        <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
          Easy
        </span>
      </div>

      <h3 className="font-semibold mb-2">Problem Statement</h3>

      <p className="text-gray-300 leading-7">
        Given an array of integers nums and an integer target,
        return indices of the two numbers such that they add up to target.
      </p>

      <h3 className="font-semibold mt-6 mb-2">
        Example
      </h3>

      <pre className="bg-gray-900 rounded p-3 text-sm">
{`Input:
nums = [2,7,11,15]
target = 9

Output:
[0,1]`}
      </pre>

      <h3 className="font-semibold mt-6 mb-2">
        Constraints
      </h3>

      <ul className="list-disc ml-6 space-y-1">
        <li>2 ≤ nums.length ≤ 10⁴</li>
        <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
        <li>Only one valid answer exists.</li>
      </ul>
    </div>
  );
};

export default ProblemPanel;