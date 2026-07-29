const TestResults = () => {
  return (
    <div className="border rounded-lg p-4 h-[220px]">
      <h2 className="font-semibold text-lg mb-4">
        Test Results
      </h2>

      <div className="space-y-3">

        <p>
          Status:
          <span className="text-yellow-400 ml-2">
            Not Executed
          </span>
        </p>

        <p>
          Execution Time:
          <span className="ml-2">
            --
          </span>
        </p>

        <p>
          Memory:
          <span className="ml-2">
            --
          </span>
        </p>

        <p>
          Output:
        </p>

        

      </div>
    </div>
  );
};

export default TestResults;