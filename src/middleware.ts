import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  console.log("🛡️ Middleware checking:", pathname);

  const protectedPaths = ["/blog/submit"];
  const adminPaths = ["/admin"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAdmin = adminPaths.some((path) => pathname.startsWith(path));

  if (isProtected || isAdmin) {
    if (!token) {
      console.log("🔁 No token, redirecting to login:", pathname);
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    try {
      const user = await verifyToken(token);
      if (!user) {
        console.log("🔁 Invalid token, redirecting:", pathname);
        url.pathname = "/login";
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
      }

      if (isAdmin && user.role !== "admin") {
        console.log("🚫 Not admin, redirecting:", pathname);
        url.pathname = "/not-authorized";
        return NextResponse.redirect(url);
      }

      console.log("✅ Middleware passed for:", pathname);
      return NextResponse.next();
    } catch (err) {
      console.error("❌ Error verifying token:", err);
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blog/submit",
    "/blog/submit/:path*",
    "/admin",
    "/admin/:path*"
  ],
};
