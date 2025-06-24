'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error("Token is missing");
        return;
      }

      try {
        const res = await fetch(`/api/verifyemail?token=${token}&id=${id}`);
        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || "Email verified successfully");
          router.push('/login');
        } else {
          toast.error(data.message || "Verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Something went wrong");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Verifying your email...</p>
    </div>
  );
}
