import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  MEMBER_COOKIE,
  verifyAdminToken,
  verifyMemberToken,
} from "@/lib/auth/session";

const NOINDEX_HEADER = "noindex, nofollow, noarchive";

function withNoIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", NOINDEX_HEADER);
  return response;
}

/**
 * Rewrites must target the server's own (always-resolvable) host — Next
 * proxies them via a real internal fetch, which fails DNS resolution for a
 * subdomain host that isn't actually routable (e.g. in local dev). Only the
 * pathname changes; the browser never sees this URL.
 */
function rewritePath(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

/**
 * Redirects are resolved by the browser as a fresh top-level navigation, so
 * they must carry the real subdomain host — `request.nextUrl` does not
 * reliably reflect the incoming `Host` header, so it's read explicitly here.
 */
function redirectUrl(request: NextRequest, host: string, pathname: string) {
  const url = new URL(pathname, `${request.nextUrl.protocol}//${host}`);
  return url;
}

export default async function proxy(request: NextRequest) {
  const hostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0];
  const pathname = request.nextUrl.pathname;

  const isAdminHost = hostname.startsWith("admin.");
  const isPortalHost = hostname.startsWith("dashboard.");

  // Internal route segments must never be reachable from the apex/marketing
  // host directly — only through their dedicated subdomain.
  if (!isAdminHost && !isPortalHost) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  if (isAdminHost) {
    const internalPath = `/admin${pathname === "/" ? "" : pathname}`;
    const isLoginPage = internalPath === "/admin/login";

    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const session = await verifyAdminToken(token);

    if (!session && !isLoginPage) {
      return withNoIndex(
        NextResponse.redirect(redirectUrl(request, hostHeader, "/login")),
      );
    }

    if (session && isLoginPage) {
      return withNoIndex(
        NextResponse.redirect(redirectUrl(request, hostHeader, "/")),
      );
    }

    return withNoIndex(NextResponse.rewrite(rewritePath(request, internalPath)));
  }

  // isPortalHost
  const internalPath = `/portal${pathname === "/" ? "" : pathname}`;

  if (internalPath === "/portal/dashboard") {
    const token = request.cookies.get(MEMBER_COOKIE)?.value;
    const session = await verifyMemberToken(token);
    if (!session) {
      return withNoIndex(
        NextResponse.redirect(redirectUrl(request, hostHeader, "/login")),
      );
    }
  }

  return withNoIndex(NextResponse.rewrite(rewritePath(request, internalPath)));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|og-image.jpg|images/|manifest.webmanifest).*)",
  ],
};
