export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "btn-gradient",
    secondary: "btn-glass",
    danger: "btn-danger",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
