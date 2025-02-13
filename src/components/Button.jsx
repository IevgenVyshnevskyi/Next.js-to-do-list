export default function Button({ onClick, children, className }) {
    return (
      <button
        onClick={onClick}
        className={`focus:ring-2 focus:outline-none ${className}`}
      >
        {children}
      </button>
    );
  }