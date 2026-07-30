const TestResults = () => {
  return (
    <div className="border border-gray-600 rounded-md p-5">

      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Test Result
      </h2>

      <hr className="border-gray-600 mb-4" />

      {/* Status */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Status</p>
        <p className="text-green-500 font-semibold">
          ✅ Accepted
        </p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Runtime */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Runtime</p>
        <p>18 ms</p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Memory */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Memory</p>
        <p>42 MB</p>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Output */}
      <div>
        <p className="text-gray-400 text-sm mb-2">
          Output
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-md p-3">
[0,1]
        </pre>
      </div>

    </div>
  );
};

export default TestResults;