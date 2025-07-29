"use client";

import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 text-sm text-gray-500 dark:text-gray-300 space-y-4">
      <p>© {new Date().getFullYear()} Sayan Dey. All rights reserved.</p>

      <div className="flex justify-center space-x-5 text-lg">
        <Link
          href="https://github.com/sayan-dey12"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.instagram.com/sayan_.dey_/#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition"
        >
          <FaInstagram />
        </Link>
        <Link
          href="https://x.com/sayan_dey12"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          <FaXTwitter />
        </Link>
      </div>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Curious to know more? <Link href="/about" className="underline">About</Link>
      </p>
    </footer>
  );
}
