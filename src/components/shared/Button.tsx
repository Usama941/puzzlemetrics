import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "white";

type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-pm text-text1 hover:opacity-95 border border-transparent",
  outline:
    "bg-transparent text-text1 border border-border2 hover:border-pm hover:bg-pm/10",
  white:
    "bg-text1 text-pm hover:bg-text2 border border-transparent",
};

export const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity duration-200 ease-out disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
