import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService
      .getAllDocument()
      .then((r) => r && setPosts(r.documents || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      {/* Hero Section */}
      <section className="pt-16 pb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="gradient-text">Share Your Stories</span>
          <br />
          <span className="text-[var(--text-primary)]">With the World</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          Discover ideas, explore insights, and publish your thoughts on BlogVerse — the modern platform for writers and readers.
        </p>
        {!authStatus && (
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <button className="btn-gradient px-8 py-3">
                <span>Get Started</span>
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-glass px-8 py-3">
                Sign Up Free
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Posts Section */}
      <section className="pb-16">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="spinner" />
          </div>
        ) : !posts.length ? (
          <div className="glass-card p-12 text-center animate-fade-in-up max-w-xl mx-auto">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No posts yet</h2>
            <p className="text-[var(--text-muted)] mb-6">
              {authStatus
                ? "Be the first to create a post and share your story!"
                : "Log in to discover and create amazing blog posts."
              }
            </p>
            {authStatus ? (
              <Link to="/add-post">
                <button className="btn-gradient px-6 py-2.5">
                  <span>Create Your First Post</span>
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn-gradient px-6 py-2.5">
                  <span>Log In to Get Started</span>
                </button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </>
        )}
      </section>
    </Container>
  );
}
