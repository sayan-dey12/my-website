"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginInner() {
  const { setLoggedIn, loggedIn, mounted } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const cb = searchParams.get("callbackUrl") || "/";
    setCallbackUrl(cb);
    console.log("✅ Callback URL:", cb);
  }, [searchParams]);

  useEffect(() => {
    if (mounted && loggedIn) {
      router.replace(callbackUrl); // Prevent logged-in users from staying on login
    }
  }, [mounted, loggedIn, callbackUrl, router]);

  if (!mounted || loggedIn) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setShowResend(false);

    try {
      const response = await axios.post("/api/auth/login", form, {
        withCredentials: true, // ✅ important if cookies are used
      });
      console.log("Successfully Logged in", response.data);
      setLoggedIn(true);
      toast.success("Successfully Logged in!", { duration: 3000 });
      setTimeout(() => {
        router.push(callbackUrl);
      }, 200); // Wait for state to propagate
    } catch (error: any) {
      console.log("Login failed", error.response?.data?.message || error.message);
      if (error.response?.data?.message === "UNVERIFIED_EMAIL") {
        setShowResend(true);
        toast.error("Please verify your email", { duration: 3000 });
      } else {
        toast.error(error.response?.data?.message || "Login failed", { duration: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!form.email) {
      return toast.error("Enter your email first", { duration: 3000 });
    }

    try {
      toast("Resend clicked", { duration: 3000 });
      const res = await axios.post("/api/resend-verification", { email: form.email });
      console.log("Resend success: ", res.status, res.data);
      toast.success("Verification email resent", { duration: 3000 });
    } catch (err: any) {
      console.error("Resend error:", err);
      toast.error(err.response?.data?.message || "Error resending email", { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/signup"}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-1">
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            form="login-form"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          {showResend && (
            <Button
              variant="link"
              onClick={handleResend}
              className="text-sm text-blue-600 underline"
            >
              Resend verification email
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
