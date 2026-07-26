function Input({
  label,
  type = "text",
  placeholder = "",
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-text">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border border-border bg-surface px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-text outline-none focus:border-primary ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;