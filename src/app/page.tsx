"use client";

import { IconCloudDemo } from "@/components/magicui/icon-cloud-demo";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  createdAt: string;
};

export default function HomePage() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("🚧 Feature coming soon!");
  };
  const handleConnect = () => {
  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    "/connect",
    "ConnectWindow",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
};


  useEffect(() => {
    fetch("/api/blogs/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLatestBlogs(data.blogs);
        }
      });
  }, []);

  return (
    <main className="w-full px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-10 py-16">
        {/* Left side - About me */}
        <div className="w-full px-2 sm:px-4">
          <div className="space-y-6 text-center md:text-left break-words">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Hi, I'm <span className="text-blue-600">Sayan</span> 👋
            </h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
              I'm a passionate <strong>student</strong> and dedicated <strong>learner</strong> on a journey through
              <span className="text-blue-600 font-medium"> full-stack development</span>,
              <span className="text-green-600 font-medium"> AI</span>, and more.
            </p>
            <p className="text-sm sm:text-md text-gray-500 dark:text-gray-400">
              I build, write, and share what I learn. Every blog, project, or experiment is part of my learning path.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={handleComingSoon}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
              >
                Projects
              </button>
              <button
                onClick={handleConnect}
                className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition"
              >
                Connect with Me
              </button>

              <Link
                href="/blogs"
                className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                See All Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Icon Cloud */}
        <div className="w-full max-w-full flex justify-center md:justify-end">
          <div className="w-[250px] sm:w-[300px] md:w-[350px]">
            <IconCloudDemo />
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">Latest Blogs</h2>

        {latestBlogs.length === 0 ? (
          <p className="text-gray-500 text-center">Loading latest blogs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <div className="hover:shadow-md transition rounded-xl overflow-hidden border">
                  <div className="relative w-full h-[250px]">
                    <img
                      src={blog.coverImage || "/images/fallback.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{blog.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA: Write a Blog */}
        <div className="mt-20 text-center border-t pt-10">
          <h2 className="text-2xl font-semibold mb-4">Want to share something?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Write and publish your own blog post now!
          </p>
          <Link
            href="/blog/submit"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition"
          >
            Write a Blog
          </Link>
        </div>
        <br /><br />
      </section>
    </main>
  );
}
