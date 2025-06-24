'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Making DevSecOps Work by Balancing Speed, Security & Scale",
    image: "/images/devsecops.jpg",
    excerpt:
      "Building and shipping software quickly is a necessity in today's competitive landscape...",
    date: "May 14, 2025",
  },
  {
    id: 2,
    title: "The best alternative to Google Sheets",
    image: "/images/google-sheets.jpg",
    excerpt:
      "Data is the new fuel of the tech industry, and effectively storing, analyzing...",
    date: "Mar 17, 2025",
  },
  {
    id: 3,
    title: "Overcoming Package Management Challenges",
    image: "/images/package.jpg",
    excerpt:
      "We often deal with different package managers, which can be frustrating...",
    date: "Oct 25, 2024",
  },
  {
    id: 4,
    title: "5 Common Hacktoberfest Mistakes",
    image: "/images/hacktoberfest.jpg",
    excerpt:
      "Looking to contribute to open source? Avoid these common beginner pitfalls...",
    date: "Oct 17, 2024",
  },
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

if (!mounted) return null; // Prevent mismatch
  return (
    <div className="max-w-7xl mx-auto p-4">
      
      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="w-full md:w-1/2 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Blog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Featured post */}
        <Card className="md:col-span-2">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="rounded-t-xl w-full h-64 object-cover"
          />
          <CardContent className="p-4">
            <CardTitle className="text-2xl mb-2">{blogs[0].title}</CardTitle>
            <p className="text-gray-600">{blogs[0].excerpt}</p>
            <p className="text-sm text-gray-500 mt-2">{blogs[0].date}</p>
          </CardContent>
        </Card>

        {/* Right side blogs */}
        <div className="flex flex-col gap-4">
          {blogs.slice(1, 3).map((blog) => (
            <Card key={blog.id} className="flex gap-4 h-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-28 h-20 object-cover rounded-l-xl"
              />
              <CardContent className="p-3">
                <CardTitle className="text-md">{blog.title}</CardTitle>
                <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* More Posts */}
      <h2 className="text-xl font-semibold mb-4">More Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.slice(2).map((blog) => (
          <Card key={blog.id}>
            <img
              src={blog.image}
              alt={blog.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />
            <CardContent className="p-4">
              <CardTitle className="text-lg">{blog.title}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.excerpt}
              </p>
              <p className="text-xs text-gray-500 mt-2">{blog.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 border rounded-full hover:bg-gray-100 transition">
          ⌄ Load more posts
        </button>
      </div>
    </div>
  );
}

