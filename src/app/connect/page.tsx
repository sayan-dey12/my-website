"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function ConnectPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message, { duration: 3000 });
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong", { duration: 3000 });
      }

    } catch (error) {
      toast.error("Failed to connect. Try again later.", { duration: 3000 });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Connect with Me</h1>

      <div className="flex space-x-6 text-2xl mb-8">
        <Link href="https://github.com/sayan-dey12" target="_blank" className="hover:text-black dark:hover:text-white transition">
          <FaGithub />
        </Link>
        <Link href="https://x.com/sayan_dey12" target="_blank" className="hover:text-blue-500 transition">
          <FaXTwitter />
        </Link>
        <Link href="https://www.instagram.com/sayan_.dey_/" target="_blank" className="hover:text-pink-500 transition">
          <FaInstagram />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
