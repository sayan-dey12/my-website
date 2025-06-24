'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false)
  
      useEffect(() => {
        setMounted(true);
      }, []);
  
  if (!mounted) return null; // Prevent mismatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        
        const response = await axios.post('api/auth/signup',form);
        console.log("signup success",response.data);
        router.push("/login");
        toast.success("Signup successful! Check your email to verify your account.");
        
    } catch (error:any) {
        console.log("signup fails", error.message);
        toast.error(error.response.data.message);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50  dark:bg-gray-900">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <p className="text-sm text-muted-foreground">Sign up to get started</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4" id='my-form'>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" value={form.username} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
    
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"> 
                <Button type="submit" className="w-full" form='my-form' disabled={loading}>
                     {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
