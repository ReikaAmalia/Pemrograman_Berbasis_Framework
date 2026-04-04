import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth";

function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware as NextMiddleware, ["/produk", "/about", "/profile", "/admin", "/editor"]);

export const config = {
  matcher: ["/produk", "/about", "/profile", "/admin", "/editor"],
};