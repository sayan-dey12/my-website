export async function fetchBlogs() {
  try {
    const res = await fetch(`${process.env.DOMAIN}/api/blogs`, {
      next: { revalidate: 60 }, // ensures ISR even if API is used directly
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, blogs: [] };
  }
}
