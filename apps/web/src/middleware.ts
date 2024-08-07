import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./app/api/getMe";
import { token } from "./app/api/token";
import { getAccessToken, getRefeshToken } from "./utils/cookies";
import { isGetMeResponse, isTokenResponse } from "./utils/apiTypeGuard";
import {
  removeAuthCookieResponse,
  removeRefeshTokenResponse,
  removeUserAuthCookieResponse,
  setAccessTokenResponse,
  setAuthResponse,
  setRefreshTokenResponse,
} from "./utils/cookiesResponse";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/app/logout")) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    removeAuthCookieResponse(response);
    return response;
  } else {
    const accessToken = getAccessToken();
    if (!accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      removeRefeshTokenResponse(response);
      removeUserAuthCookieResponse(response);
      return response;
    }

    const data = await getMe(accessToken);
    if (isGetMeResponse(data)) {
      const response = NextResponse.next();
      setAuthResponse(response, data.data.user.firstName);
    }

    // if token expired try refreshToken
    if (data.statusCode === "10001" && data.message === "Unauthorized") {
      const refreshToken = getRefeshToken();

      if (!refreshToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        removeAuthCookieResponse(response);
        return response;
      }
      const res = await token(accessToken, refreshToken);
      if (res.statusCode === "10000" && isTokenResponse(res)) {
        const response = NextResponse.next();
        setAccessTokenResponse(response, res.data.tokens.accessToken);
        setRefreshTokenResponse(response, res.data.tokens.refreshToken);
        return response;
      } else {
        // if call refreshToken not success redirect login and remove accessToken and refreshToken
        const response = NextResponse.redirect(new URL("/login", request.url));
        removeAuthCookieResponse(response);
        return response;
      }
    }
  }
}

export const config = {
  matcher: ["/app/:path*"],
};
