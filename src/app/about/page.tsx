'use client';

import Link from 'next/link';
import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";

export const metadata = {
  title: 'About | Sayan Dey (Strider)',
  description: 'Learn more about Sayan Dey aka Strider — a passionate student, developer, and the creator of TechWithStrider.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      <section>
        <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
          I'm <strong>Sayan Dey</strong>, also known online as <strong>Strider</strong>. I'm a curious and self-driven student currently exploring full-stack development, artificial intelligence, and open-source engineering.
        </p>
        <p className="mt-4 text-md text-gray-600 dark:text-gray-400 text-center">
          I created <strong>TechWithStrider</strong> as my personal learning lab — a space to build, write, and share everything I learn in tech. Whether it’s writing blog posts, building tools, or experimenting with AI — I’m constantly learning and growing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">Tech Stack</h2>
        <ul className="flex flex-wrap justify-center gap-4 text-sm text-white">
          <li className="bg-blue-600 px-3 py-1 rounded-full">JavaScript / TypeScript</li>
          <li className="bg-indigo-600 px-3 py-1 rounded-full">React / Next.js</li>
          <li className="bg-purple-600 px-3 py-1 rounded-full">Node.js / Express</li>
          <li className="bg-pink-600 px-3 py-1 rounded-full">MongoDB / Redis</li>
          <li className="bg-green-600 px-3 py-1 rounded-full">Docker / GitHub Actions</li>
          <li className="bg-yellow-600 px-3 py-1 rounded-full">AI / LangChain / Python</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">Find Me Online</h2>
        <div className="flex justify-center gap-8 text-2xl text-gray-700 dark:text-gray-300">
          <Link href="https://github.com/sayan-dey12" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-black dark:hover:text-white transition" />
          </Link>
          <Link href="https://x.com/sayan_dey12" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-blue-600 transition" />
          </Link>
          <Link href="https://www.instagram.com/sayan_.dey_/#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-600 transition" />
          </Link>
        </div>
      </section>
    </main>
  );
}
