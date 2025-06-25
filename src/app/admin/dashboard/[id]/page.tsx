'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  status: 'pending' | 'approved' | 'rejected';
  // Add other fields if needed
}

export default function AdminBlogReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog');
        const data = await res.json();

        if (!data.blog || data.blog.status !== 'pending') {
          setBlog(null); // Force "Blog not found"
        } else {
          setBlog(data.blog);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleAction = async (action: 'approve' | 'reject') => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || 'Action failed');
        return;
      }

      toast.success(data.message);
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error('Action failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found or already reviewed.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {blog.coverImage && (
            <img src={blog.coverImage} alt="cover" className="rounded mb-4 w-full h-60 object-cover" />
          )}
          <p className="text-gray-800 whitespace-pre-line">{blog.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="destructive"
            disabled={processing}
            onClick={() => handleAction('reject')}
          >
            {processing ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            Reject
          </Button>
          <Button
            disabled={processing}
            onClick={() => handleAction('approve')}
          >
            {processing ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            Approve
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
