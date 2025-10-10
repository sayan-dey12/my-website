import { Suspense } from "react";
import { fetchBlogs } from "@/lib/fetchBlogs";
import BlogList from "./components/BlogList";

export const revalidate = 60; // ISR: rebuild page every 60 seconds

export default async function BlogPage() {
  const data = await fetchBlogs();

  if (!data.success) {
    return (
      <main className="max-w-7xl mx-auto p-6 text-center text-gray-500">
        Failed to load blogs.
      </main>
    );
  }

  const blogs = data.blogs;

  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-6">
      <Suspense fallback={<p className="text-center">Loading blogs...</p>}>
        <BlogList blogs={blogs} />
      </Suspense>
    </main>
  );
}
