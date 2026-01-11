import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // ✅ WAJIB
  });

//    // 🔓 Public route (login di root)
//   if (pathname === "/") {
//     return NextResponse.next();
//   }

    // Jika tidak ada token, redirect ke login

    // ==========================
  // 1. BELUM LOGIN
  // ==========================
  if (!token) {
    // Block SEMUA route terproteksi
    if (
      pathname.startsWith("/admin") ||

      pathname.startsWith("/super-admin")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
  
    // Validasi role sesuai path
    const userRole = token.role as string;

    if (
    pathname.startsWith("/superadmin")
  ) {
    if (userRole !== "superadmin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

   if (
    pathname.startsWith("/admin")
  ) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

    if (pathname.startsWith('/external') && userRole !== 'external') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
};

const config = {
    matcher: ['/super-admin/:path*', '/admin/:path*', '/external/:path*'],
};

export { middleware, config };

