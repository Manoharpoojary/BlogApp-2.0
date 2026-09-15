export default function Logo({ width = "100px" }) {
  return (
    <div style={{ width }} className="flex items-center gap-2 select-none">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
        <path d="M8 9h4l2 4 2-4h4v10h-3v-5.5l-2 3.5h-2l-2-3.5V19H8V9z" fill="white" />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-extrabold text-lg tracking-tight gradient-text">BlogVerse</span>
    </div>
  );
}
