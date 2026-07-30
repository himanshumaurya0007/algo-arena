function Loader({
  size = "medium",
  text = "Loading...",
  className = "",
}) {

  const sizes = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-4",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>

      {/* Spinner */}
      <div
        className={`animate-spin rounded-full border-primary border-t-transparent ${sizes[size]}`}
      ></div>

      {/* Loading Text */}
      {text && (
        <p className="text-sm text-text">
          {text}
        </p>
      )}

    </div>
  );
}

export default Loader;