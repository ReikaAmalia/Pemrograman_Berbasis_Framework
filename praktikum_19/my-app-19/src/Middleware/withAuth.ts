import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];
export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const Url = new URL("/auth/login", req.url);
        Url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(Url); 
        // perlindungan untuk halaman yang membutuhkan autentikasi, jika tidak ada token maka akan diarahkan ke halaman login menggunakan middleware
      }
      if (token.role !=="admin" && hanyaAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }
     if (token.role !== "editor" && token.role !== "admin" && hanyaEditor.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
  }
    return middleware(req, next);
  };
}
