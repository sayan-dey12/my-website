"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react"
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from "next/navigation";

export default function Login() {
  const { setLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false); // ⬅️ New
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cb = params.get("callbackUrl") || "/";
    setCallbackUrl(cb);
    console.log("✅ Callback URL:", cb);
  }, []);

  

  
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setShowResend(false); // hide resend button for new attempts
    try {
      const response = await axios.post('/api/auth/login', form);
      console.log("Successfully Logged in", response.data);
      setLoggedIn(true);
      console.log("Callback URL:", callbackUrl);
      router.push(callbackUrl); 
      toast.success("Successfully Logged in!");
    } catch (error: any) {
      console.log("Login failed", error.response?.data?.message || error.message);
      if (error.response?.data?.message === "UNVERIFIED_EMAIL") {
        setShowResend(true); // ⬅️ Show button
        toast.error("Please verify your email");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!form.email) { 
      return toast.error("Enter your email first");
    }

    try {
      toast("Resend clicked");
      const res = await axios.post('/api/resend-verification', { email: form.email });
     console.log("Resend success: ", res.status, res.data);
     toast.success("Verification email resent");
    } catch (err: any) {
       console.error("Resend error:", err);
      toast.error(err.response?.data?.message || "Error resending email");
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
                <Input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="grid gap-1">
                <a href="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="login-form" disabled={loading} onClick={handleSubmit}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          {showResend && (
            <Button variant="link" onClick={handleResend} className="text-sm text-blue-600 underline">
              Resend verification email
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
