"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { loggedIn, setLoggedIn } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
  setLoading(true);
  try {
    await fetch("/api/auth/logout", { credentials: "include" });
    toast.success("Logged out");
    setLoggedIn(false);
    window.location.href = "/"; // ✅ Reloads and reruns middleware, fixes access
  } catch (error) {
    console.log("Logout failed", error);
    toast.error("Logout failed");
  } finally {
    setLoading(false);
  }
};


  const handleComingSoon = () => {
    toast("🚧 Feature coming soon!");
  };

  if (!mounted) return null;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b shadow-sm z-50 relative">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Sayan Dey
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/blogs" className="hover:underline">Blogs</Link>
          <button onClick={handleComingSoon} className="hover:underline">Projects</button>
          <button onClick={handleComingSoon} className="hover:underline">Video Call</button>

          {!loggedIn ? (
            <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
              <Button>Login</Button>
            </Link>
          ) : (
            <Button variant="destructive" onClick={handleLogout} disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Logout"}
            </Button>
          )}

          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-white dark:bg-gray-900 shadow-md space-y-3">
          <Link href="/blogs" className="block" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <button onClick={() => { handleComingSoon(); setMenuOpen(false); }} className="block">Projects</button>
          <button onClick={() => { handleComingSoon(); setMenuOpen(false); }} className="block">Video Call</button>
           <Link href="/about" className="block" onClick={() => setMenuOpen(false)}>About</Link>

          {!loggedIn ? (
            <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} onClick={() => setMenuOpen(false)}>
              <Button className="w-auto px-4 py-2 text-sm md:w-full">Login</Button>
            </Link>
          ) : (
            <Button
              variant="destructive"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              disabled={loading}
              className="w-auto px-4 py-2 text-sm md:w-full"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Logout"}
            </Button>
          )}
           
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setMenuOpen(false);
            }}  className="ml-2"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      )}
    </nav>
  );
}
