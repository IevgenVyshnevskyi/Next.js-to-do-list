import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`focus:ring-2 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;