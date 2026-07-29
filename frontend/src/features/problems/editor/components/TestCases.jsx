const TestCases = () => {
  return (
    <div className="border rounded-lg p-4 h-[220px]">
      <h2 className="font-semibold text-lg mb-4">
        Test Cases
      </h2>

      <div className="space-y-3">

        <div className="bg-gray-900 rounded p-3">
          <p className="font-medium">Test Case 1</p>

          <p className="text-sm mt-2">
            Input:
          </p>

          <pre className="text-sm">
{`2 7 11 15
9`}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default TestCases;