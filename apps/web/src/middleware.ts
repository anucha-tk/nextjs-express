import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./app/api/getMe";
import { token } from "./app/api/token";
import { getAccessToken, getRefeshToken } from "./utils/cookies";
import { isTokenResponse } from "./utils/apiTypeGuard";
import {
  removeAuthCookieResponse,
  removeRefeshTokenResponse,
  setAccessTokenResponse,
  setRefreshTokenResponse,
} from "./utils/cookiesResponse";

export async function middleware(request: NextRequest) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    removeRefeshTokenResponse(response);
    return response;
  }
  const data = await getMe(accessToken);
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

export const config = {
  matcher: ["/app/:path*"],
};
