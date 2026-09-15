import { useId } from "react";
import React from "react";
const Input = React.forwardRef(function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return <div className="w-full">{label && <label htmlFor={id} className="block mb-1 font-medium">{label}</label>}<input id={id} ref={ref} type={type} className={`px-3 py-2 rounded-lg bg-white text-black border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`} {...props}/></div>;
});
export default Input;
