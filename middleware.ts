import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next({
    headers: { "x-pathname": request.nextUrl.pathname },
  });
}

export const config = { matcher: ["/((?!api|_next|.next|.*\\..*).*)"] };
