function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-secondary text-white',
    muted: 'bg-border text-text',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
    info: 'bg-info/10 text-info',
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
