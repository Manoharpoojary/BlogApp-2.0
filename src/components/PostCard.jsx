import { Link } from "react-router-dom";
import useFilePreview from "../hooks/useFilePreview";

export default function PostCard({ $id, title, featuredImage }) {
  const imageUrl = useFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`} className="block group animate-fade-in-up">
      <article className="glass-card glass-card-hover overflow-hidden">
        {/* Image */}
        <div className="img-zoom-wrapper aspect-video bg-[var(--bg-elevated)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-[var(--accent-mid)] transition-colors duration-200">
            {title}
          </h2>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Read more</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
