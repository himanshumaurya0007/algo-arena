function Divider({
  children,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>

      <div className="flex-1 h-px bg-border"></div>

      {children && (
        <span className="text-sm text-slate-400">
          {children}
        </span>
      )}

      <div className="flex-1 h-px bg-border"></div>

    </div>
  );
}

export default Divider;