import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getAllDocument({ status: "active" })
      .then((r) => r && setPosts(r.documents || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <section className="py-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text mb-8">
          All Posts
        </h1>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="spinner" />
          </div>
        ) : !posts.length ? (
          <div className="glass-card p-12 text-center max-w-lg mx-auto">
            <p className="text-[var(--text-muted)]">No active posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {posts.map((p) => (
              <PostCard key={p.$id} {...p} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
