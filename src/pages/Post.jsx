import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import useFilePreview from "../hooks/useFilePreview";
import parse from "html-react-parser";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((s) => s.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService
      .getDocument({ slug })
      .then((r) => setPost(r || null))
      .finally(() => setLoading(false));
  }, [slug]);

  const imageUrl = useFilePreview(post?.featuredImage);

  const remove = async () => {
    if (!confirm("Delete this post?")) return;
    const ok = await appwriteService.DeleteDocument({ slug });
    if (ok) {
      if (post?.featuredImage)
        await appwriteService.fileDeleteService(post.featuredImage);
      navigate("/all-posts");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="spinner" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in-up">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="15" x2="16" y2="15" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <p className="text-xl font-semibold text-[var(--text-primary)]">Post not found</p>
        <Link to="/" className="text-sm text-[var(--accent-mid)] hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const owner = post.userid === user?.$id;

  return (
    <article className="max-w-4xl mx-auto py-10 px-4 animate-fade-in-up">
      {/* Hero Image */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Content Card */}
      <div className="glass-card p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] leading-tight mb-6">
          {post.title}
        </h1>

        <div className="gradient-divider mb-8" />

        <div className="prose-dark whitespace-pre-wrap">
          {parse(String(post.content))}
        </div>

        {/* Owner Actions */}
        {owner && (
          <div className="flex gap-3 mt-10 pt-6 border-t border-[var(--glass-border)]">
            <Link
              to={`/edit-post/${post.$id}`}
              className="btn-gradient px-5 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit</span>
            </Link>
            <button
              onClick={remove}
              className="btn-danger px-5 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
