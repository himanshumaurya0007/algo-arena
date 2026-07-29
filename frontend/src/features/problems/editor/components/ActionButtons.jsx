const ActionButtons = () => {
  return (
    <div className="flex gap-3">
      <button className="bg-green-600 px-4 py-2 rounded text-white">
        Run
      </button>

      <button className="bg-blue-600 px-4 py-2 rounded text-white">
        Submit
      </button>
    </div>
  );
};

export default ActionButtons;