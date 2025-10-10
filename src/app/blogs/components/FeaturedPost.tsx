import Link from "next/link";

export default function FeaturedPost({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="flex-1 group">
      <article className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition w-full">
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px]">
          <img
            src={post.coverImage || "/images/fallback.png"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-2 group-hover:underline">
            {post.title}
          </h2>
          <p className="text-sm opacity-80 mb-2">
            {post.author} • {post.readingTime} •{" "}
            {new Date(post.createdAt).toDateString()}
          </p>
          <p className="text-base opacity-90 line-clamp-2">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
