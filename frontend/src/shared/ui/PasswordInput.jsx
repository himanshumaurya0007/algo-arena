import { useState } from "react";

function PasswordInput({
  label,
  placeholder = "",
  error = "",
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-text">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full rounded-md border border-border bg-surface px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 text-sm sm:text-base text-text outline-none focus:border-primary ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;
