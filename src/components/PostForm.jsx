import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Button, Input } from "./index";
import Editor from "./Editor";

export default function PostForm({ post }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      status: post?.status || "active",
    },
  });

  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.userData);

  useEffect(() => setContent(post?.content || ""), [post]);

  const submit = async (data) => {
    setError("");
    setLoading(true);
    try {
      let uploadedId = post?.featuredImage || "";
      if (image) {
        const file = await appwriteService.fileUploadService(image);
        if (!file) {
          setError("Image upload failed");
          setLoading(false);
          return;
        }
        uploadedId = file.$id;
        if (post?.featuredImage)
          await appwriteService.fileDeleteService(post.featuredImage);
      }
      const payload = {
        title: data.title,
        slug: data.slug,
        content,
        featuredImage: uploadedId,
        status: data.status,
        userid: user?.$id,
      };
      const result = post
        ? await appwriteService.updateDocument(post.$id, payload)
        : await appwriteService.createNewDocument(payload);
      if (result) navigate(`/post/${post?.$id || data.slug}`);
      else setError("Could not save post");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in-up">
      <h1 className="text-3xl font-bold gradient-text mb-8">
        {post ? "Edit Post" : "Create New Post"}
      </h1>

      <form onSubmit={handleSubmit(submit)} className="glass-card p-6 md:p-8 space-y-6">
        <Input
          label="Title"
          placeholder="Enter your post title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="your-post-slug"
          disabled={!!post}
          {...register("slug", { required: true, pattern: /^[a-z0-9-]+$/ })}
        />

        <div>
          <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)] tracking-wide">
            Content
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)] tracking-wide">
            Featured Image
          </label>
          <label className="file-upload-area flex flex-col items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm text-[var(--text-muted)]">
              {image ? image.name : "Click to upload an image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        {/* Status Select */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)] tracking-wide">
            Status
          </label>
          <select {...register("status")} className="select-dark">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="error-alert flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading
            ? post ? "Updating…" : "Creating…"
            : post ? "Update Post" : "Create Post"
          }
        </Button>
      </form>
    </div>
  );
}
