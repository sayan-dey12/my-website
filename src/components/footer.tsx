"use client";

import { FaGithub, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-8 text-sm text-gray-600 dark:text-gray-300 space-y-6 border-t border-gray-200 dark:border-gray-700">
      <p>© {new Date().getFullYear()} Sayan Dey (TechWithStrider). All rights reserved.</p>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 text-xl">
        <Link href="https://github.com/sayan-dey12" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
          <FaGithub />
        </Link>
        <Link href="https://www.instagram.com/sayan_.dey_" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
          <FaInstagram />
        </Link>
        <Link href="https://x.com/sayan_dey12" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
          <FaXTwitter />
        </Link>
        <Link href="https://www.linkedin.com/in/sayan-dey-b37843378/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
          <FaLinkedin />
        </Link>
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-center gap-6 text-sm">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/blogs" className="hover:underline">Blogs</Link>
        <Link href="/connect" className="hover:underline">Contact</Link>
      </div>
    </footer>
  );
}
