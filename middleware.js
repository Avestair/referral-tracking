import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

// 1. Define your private/protected routes
const privateRoutes = ["/referrallist", "/addreferral", "/qrcodegen"];

// 2. Define paths that should be completely public
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/api/login",
  "/api/register",
  "/[referralName]",
];

// 3. File extensions that should always be public
const publicExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
];

export async function middleware(request) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;

  // 4. First check - allow all static files and public assets
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/public/") ||
    publicExtensions.some((ext) => pathname.endsWith(ext))
  ) {
    return NextResponse.next();
  }

  // 5. Second check - allow all public paths (including dynamic [referralName])
  if (
    publicPaths.some((p) => {
      if (p.startsWith("[") && p.endsWith("]")) {
        // Handle dynamic routes - matches any single path segment
        return pathname.split("/").length === 2;
      }
      return pathname === p;
    })
  ) {
    return NextResponse.next();
  }

  // 6. Third check - protect private routes
  if (privateRoutes.includes(pathname)) {
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session_token");
      return response;
    }
  }

  // 7. Default allow for any other paths (including dynamic [referralName])
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folders
     */
    "/((?!_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};
