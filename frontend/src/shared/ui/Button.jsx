function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',

    secondary: 'bg-secondary text-white hover:bg-secondary/90',

    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white',

    ghost: 'text-primary hover:bg-primary/10',
  };

  return (
    <button
      className={`cursor-pointer rounded-md px-5 py-3 font-medium transition-all duration-200 ${variants[variant]} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
