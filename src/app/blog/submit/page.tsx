'use client';

import { useState , useEffect} from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { commands as rawCommands, ICommand } from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const imageCommand: ICommand = {
  name: 'image',
  keyCommand: 'image',
  buttonProps: { 'aria-label': 'Add image' },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path d="M4 4h12v12H4z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <path d="M4 16l4-5 3 4 5-6 2 2v5z" fill="currentColor" />
    </svg>
  ),
  execute: async (state: any, api: { replaceSelection: (text: string) => void }) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        api.replaceSelection(`![image](${data.url})`);
        toast.success('Image uploaded');
      } catch {
        toast.error('Image upload failed');
      }
    };
  },
};

export default function BlogSubmitPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('**Write your blog here...**');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null; // Prevent hydration mismatch
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !content || !slug || !excerpt || !coverImage) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('excerpt', excerpt);
    formData.append('tags', tags);
    formData.append('content', content);
    formData.append('coverImage', coverImage);

    setSubmitting(true);
    try {
      const res = await fetch('/api/blog/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submit failed');

      toast.success('Blog submitted');
      router.push('/blogs'); // ✅ Redirect to blog listing or dashboard
    } catch {
      toast.error('Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Submit Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />

      <MDEditor
        value={content}
        onChange={(val) => setContent(val || '')}
        commands={[
          ...Object.values(rawCommands).filter(
            (cmd): cmd is ICommand =>
              typeof cmd === 'object' &&
              !!cmd &&
              'name' in cmd &&
              typeof cmd.name === 'string' &&
              cmd.name !== 'image'
          ),
          imageCommand,
        ]}
      />

      <input
        type="text"
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitting ? 'Submitting...' : 'Submit Blog'}
      </button>
    </form>
  );
}
