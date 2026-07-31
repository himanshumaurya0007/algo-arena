function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface shadow-card rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
