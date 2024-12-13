import { ArrowRight } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  showArrow?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  showArrow = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center px-6 py-3 border text-base font-medium rounded-md transition-colors";
  const variants = {
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "border-transparent text-indigo-700 bg-white hover:bg-indigo-50",
    outline: "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </button>
  );
}