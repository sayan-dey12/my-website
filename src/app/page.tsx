"uses client"

import { IconCloudDemo } from "@/components/magicui/icon-cloud-demo";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">Hey, I'm Sayan 👋</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Full-stack Developer • Blogger • AI Enthusiast
        </p>
        <div className="relative overflow-hidden">
          <IconCloudDemo />
        </div>

        <a href="/projects" className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded">
          See My Work
        </a>
      </section>

      {/* Featured Projects */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        {/* Project Cards here */}
      </section>

      {/* Featured Blogs */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Latest Blogs</h2>
        {/* Blog Cards here */}
      </section>

      {/* Call to Action */}
      <section className="mt-20 text-center">
        <a href="/video" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full">
          Start a Video Call
        </a>
      </section>
    </main>
  );
}
