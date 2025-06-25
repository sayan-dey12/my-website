'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export default function SubmitBlogPage() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    category: ''
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/blog/submit', form);

    toast.success('Blog submitted for review!');
    router.push('/blogs');
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || 'Something went wrong';
    toast.error(message);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Submit a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input name="excerpt" value={form.excerpt} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input name="coverImage" value={form.coverImage} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input name="tags" value={form.tags} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input name="category" value={form.category} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea name="content" rows={10} value={form.content} onChange={handleChange} required />
        </div>
        <Button type="submit">Submit Blog</Button>
      </form>
    </div>
  );
}
