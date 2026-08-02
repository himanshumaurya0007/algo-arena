const TestResults = ({ result }) => {
  // No result yet
  if (!result) {
    return (
      <div className="border border-gray-600 rounded-md p-5">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Test Result
        </h2>

        <hr className="border-gray-600 mb-4" />

        <div className="text-gray-400 text-center py-10">
          Run your code to see the result.
        </div>
      </div>
    );
  }

  const isAccepted =
    result.isAccepted === true ||
    result.status?.toLowerCase() === "accepted";

  return (
    <div className="border border-gray-600 rounded-md p-5">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Test Result
      </h2>

      <hr className="border-gray-600 mb-4" />

      {/* Status */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-1">
          Status
        </p>

        <p
          className={
            isAccepted
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {isAccepted
            ? "✅ Accepted"
            : `❌ ${result.status || "Execution Failed"}`}
        </p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Runtime */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          Runtime
        </p>

        <p>
          {result.executionTimeInMilliseconds != null
            ? `${result.executionTimeInMilliseconds} ms`
            : "N/A"}
        </p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Memory */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          Memory
        </p>

        <p>
          {result.memoryUsedInKilobytes != null
            ? `${result.memoryUsedInKilobytes} KB`
            : "N/A"}
        </p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Output */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-2">
          Output
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-md p-3 whitespace-pre-wrap overflow-auto">
          {result.standardOutput || "No output"}
        </pre>
      </div>

      {/* Compilation Error */}
      {result.compilationOutput && (
        <>
          <hr className="border-gray-700 mb-4" />

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">
              Compilation Error
            </p>

            <pre className="bg-gray-900 border border-red-700 text-red-400 rounded-md p-3 whitespace-pre-wrap overflow-auto">
              {result.compilationOutput}
            </pre>
          </div>
        </>
      )}

      {/* Runtime / Standard Error */}
      {result.standardError && (
        <>
          <hr className="border-gray-700 mb-4" />

          <div>
            <p className="text-gray-400 text-sm mb-2">
              Error
            </p>

            <pre className="bg-gray-900 border border-red-700 text-red-400 rounded-md p-3 whitespace-pre-wrap overflow-auto">
              {result.standardError}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default TestResults;