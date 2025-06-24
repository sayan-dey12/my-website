import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="hover:shadow-md transition-all cursor-pointer h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
          <p className="text-sm mt-2 text-muted-foreground">
            {post.author} • {new Date(post.date).toLocaleDateString()}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
