import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cloudinary from '@/lib/cloudinary';
import Blog from '@/models/blogModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Get token from cookies
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token' }, { status: 401 });
    }

    // Verify token and extract user ID
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const authorId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    // Extract form data
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const tags = (formData.get('tags') as string)?.split(',').map(tag => tag.trim());
    const content = formData.get('content') as string;
    const coverImageFile = formData.get('coverImage') as File;

    const buffer = Buffer.from(await coverImageFile.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'blog-covers' },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(buffer);
    });

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: uploadResult.secure_url,
      authorId: new mongoose.Types.ObjectId(authorId),
      tags,
      status: 'pending',
      isPublished: false,
    });

    return NextResponse.json({ message: 'Blog submitted', blog });
  } catch (err: any) {
    console.error('Blog Submit Error:', err);
    return NextResponse.json({ message: 'Failed to submit blog' }, { status: 500 });
  }
}
