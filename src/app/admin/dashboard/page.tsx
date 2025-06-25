'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      console.log("API Response:", data); // ✅ Log it!

      setBlogs(data.blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Blog Approvals</h1>
      <ul className="space-y-4">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <li key={blog._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p>By: {blog.authorId?.username} | {blog.authorId?.email}</p>
              <Link href={`/admin/dashboard/${blog._id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Review</button>
              </Link>
            </li>
          ))
        ) : (
          <p>No blogs to review.</p>
        )}
      </ul>

      
    </div>
  );
}
