const ActionButtons = () => {
  return (
    <div className="flex items-center gap-3">

      <button
        className="
          px-6 py-2
          bg-green-600
          hover:bg-green-700
          text-white
          rounded-md
          font-medium
          transition-all
          duration-200
          active:scale-95
          shadow-md
        "
      >
        ▶ Run
      </button>

      <button
        className="
          px-6 py-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          rounded-md
          font-medium
          transition-all
          duration-200
          active:scale-95
          shadow-md
        "
      >
        ✓ Submit
      </button>

    </div>
  );
};

export default ActionButtons;