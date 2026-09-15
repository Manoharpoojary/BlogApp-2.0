import { useState } from "react";

export default function Editor({ value, onChange }) {
  const [text, setText] = useState(value || "");

  const change = (e) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={change}
        rows={14}
        placeholder="Write your post content here…"
        className="glass-input resize-y min-h-[200px] leading-relaxed"
      />
      <div className="absolute bottom-3 right-4 text-xs text-[var(--text-muted)]">
        {text.length} chars
      </div>
    </div>
  );
}
