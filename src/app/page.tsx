"use client";

import { IconCloudDemo } from "@/components/magicui/icon-cloud-demo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaBlog, FaCode, FaEnvelope, FaTools } from "react-icons/fa";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ✅ ensures client-only rendering
    fetch("/api/blogs/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLatestBlogs(data.blogs);
        }
      });
  }, []);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("🚧 Feature coming soon!", { duration: 3000 });
  };

  // ✅ Open "Connect" in half-screen popup
  const openConnectWindow = () => {
    if (!mounted) return; // prevent SSR hydration issues

    const width = Math.floor(window.innerWidth / 2);
    const height = Math.floor(window.innerHeight * 0.8);
    const left = Math.floor((window.innerWidth - width) / 2);
    const top = Math.floor((window.innerHeight - height) / 2);

    window.open(
      "/connect",
      "ConnectPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`
    );
  };

  return (
    <main className="w-full px-4 sm:px-6 max-w-7xl mx-auto transition-colors duration-300">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12 py-20 border-b border-gray-200 dark:border-gray-800">
        {/* Left Side */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white"
          >
            Sayan Dey
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Full-Stack Developer • AI Enthusiast • Open Source Contributor
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            I’m currently a{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              college student
            </span>{" "}
            learning{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              full-stack development
            </span>
            ,{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              AI/ML applications
            </span>
            , and{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              scalable system design
            </span>
            . I love building impactful products, experimenting with new
            technologies, and sharing my learnings in public through blogs and
            open source.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <Button
              onClick={handleComingSoon}
              className="px-6 py-3 text-base rounded-lg"
            >
              🚀 Projects
            </Button>
            <Link href="/blogs">
              <Button
                variant="outline"
                className="px-6 py-3 text-base rounded-lg"
              >
                ✍️ Read Blogs
              </Button>
            </Link>
            <Button
              onClick={openConnectWindow}
              variant="secondary"
              className="px-6 py-3 text-base rounded-lg"
            >
              🤝 Connect With Me
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:justify-end">
          <div className="w-[300px] md:w-[350px]">
            <IconCloudDemo />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mt-20">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaBlog className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Blogs</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Read articles on tech, AI, and development, written with passion.
            </p>
            <Link href="/blogs">
              <Button>Explore Blogs</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaCode className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover my full-stack, AI, and open-source projects with case
              studies.
            </p>
            <Button onClick={handleComingSoon}>See Projects</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center text-center p-6">
            <FaTools className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Tools</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try out AI-powered tools built to solve real-world problems.
            </p>
            <Button onClick={handleComingSoon}>Try Tools</Button>
          </CardContent>
        </Card>
      </section>

      {/* Latest Blogs */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold mb-8 border-b border-gray-200 dark:border-gray-800 pb-3 text-gray-900 dark:text-white">
          Latest Blogs
        </h2>

        {latestBlogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Loading latest blogs...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <div className="hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-900/30 transition rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                  <div className="relative w-full h-[220px]">
                    <img
                      src={blog.coverImage || "/images/fallback.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                      {blog.excerpt}
                    </p>
                    {mounted && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-3xl">
          TechWithStrider is my personal blog and portfolio website. I’m Sayan
          Dey, a full-stack developer and student building in public with AI,
          web technologies, and open source.
        </p>
      </section>

      {/* About Section */}
      <section className="mt-20 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          About Me
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Hi, I’m a passionate college student and developer focused on building
          scalable applications, exploring AI/ML, and working with modern
          technologies like Next.js, TypeScript, and DevOps. I love solving
          complex problems, contributing to open source, and sharing my journey
          through blogs and projects.
        </p>
        <Link href="/about">
          <Button variant="outline">Learn More</Button>
        </Link>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Share Your Knowledge
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Write and publish your own blog post now.
        </p>
        <Link
          href="/blog/submit"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
        >
          Write a Blog
        </Link>
      </section>

      <br />
      <br />
    </main>
  );
}
