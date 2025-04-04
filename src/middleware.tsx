import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import config_ from "@/app/config";
import * as authServices from "@/app/services/authService";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname; 

  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const access_token_admin = request.cookies.get("access_token_admin")?.value;
  const refresh_token_admin = request.cookies.get("refresh_token_admin")?.value;

  function loginClient() {
    const responseLoginClient = NextResponse.redirect(
      new URL(config_.routes.client.login, request.url)
    );
    responseLoginClient.cookies.set("access_token", "", {
      path: "/",
      expires: new Date(0),
    });
    responseLoginClient.cookies.set("refresh_token", "", {
      path: "/",
      expires: new Date(0),
    });
    return responseLoginClient;
  }

  function loginAdmin() {
    console.log("clear admin");

    const responseLoginAdmin = NextResponse.redirect(
      new URL(config_.routes.admin.login, request.url)
    );
    responseLoginAdmin.cookies.set("access_token_admin", "", {
      path: "/",
      expires: new Date(0),
    });
    responseLoginAdmin.cookies.set("refresh_token_admin", "", {
      path: "/",
      expires: new Date(0),
    });
    return responseLoginAdmin;
  }


  if (pathname.startsWith("/auth")) {
    if (access_token && refresh_token)
      return NextResponse.redirect(new URL(config_.routes.client.account.home, request.url));
    return response;
  }

  if (
    pathname.startsWith("/account") ||
    pathname.startsWith(config_.routes.client.cart) ||
    pathname.startsWith(config_.routes.client.checkout)
  ) {
    if (!access_token || !refresh_token) return loginClient();

    try {
      const { payload } = await jwtVerify(
        access_token,
        new TextEncoder().encode(config_.constants.JWTSECRET)
      );
      return response;
    } catch (err: any) {
      if (err.code === "ERR_JWT_EXPIRED") {
        try {
          const res = await authServices.getToken(refresh_token);
          if (res.status === 200) {
            response.cookies.set("access_token", res.data, {
              path: "/",
              maxAge: 60 * 60 * 24,
            });
            return response;
          }
        } catch (error) {
          return loginClient();
        }
      }
      return loginClient();
    }
  }


  if (pathname === "/admin") {
    if (access_token_admin && refresh_token_admin)
      return NextResponse.redirect(new URL(config_.routes.admin.dashboard, request.url));
    return response;
  }

  if (pathname.startsWith("/admin/")) {
    if (!access_token_admin || !refresh_token_admin) return loginAdmin();

    try {
      const { payload }: any = await jwtVerify(
        access_token_admin,
        new TextEncoder().encode(config_.constants.JWTSECRET)
      );
      if (payload?.user?.role != 1) return loginAdmin();
      return response;
    } catch (err: any) {
      if (err.code === "ERR_JWT_EXPIRED") {
        try {
          const res = await authServices.getToken(refresh_token_admin);
          if (res.status === 200) {
            response.cookies.set("access_token_admin", res.data, {
              path: "/",
              maxAge: 60 * 60 * 24,
            });
            return response;
          }
        } catch (error) {
          return loginAdmin();
        }
      }

      return loginAdmin();
    }
  }
}


export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/auth/:path*",
    config_.routes.client.cart,
    config_.routes.client.checkout,
  ],
};
