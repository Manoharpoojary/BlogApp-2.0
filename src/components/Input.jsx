import { useId } from "react";
import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-[var(--text-secondary)] tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`glass-input ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
