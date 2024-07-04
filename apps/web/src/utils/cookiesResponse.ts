import { NextResponse } from "next/server";

export const setAccessTokenResponse = (
  response: NextResponse,
  token: string,
) => {
  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  response.cookies.set("accessToken", token, {
    httpOnly: true,
    secure: true, // Make sure to set secure:true if using HTTPS
    expires: accessTokenExpires,
  });
};

export const setRefreshTokenResponse = (
  response: NextResponse,
  token: string,
) => {
  const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  response.cookies.set("refreshToken", token, {
    secure: true, // Make sure to set secure:true if using HTTPS
    expires: refreshTokenExpires,
  });
};

export const removeAccessTokenResponse = (response: NextResponse) => {
  response.cookies.delete("accessToken");
};

export const removeRefeshTokenResponse = (response: NextResponse) => {
  response.cookies.delete("refreshToken");
};

export const setAuthResponse = (response: NextResponse, firstName: string) => {
  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  response.cookies.set("isAuthenticated", "true", {
    expires: accessTokenExpires,
  });
  response.cookies.set("userName", firstName, {
    expires: accessTokenExpires,
  });
};

export const removeAuthCookieResponse = (response: NextResponse) => {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("isAuthenticated");
  response.cookies.delete("userName");
};

export const removeUserAuthCookieResponse = (response: NextResponse) => {
  response.cookies.delete("isAuthenticated");
  response.cookies.delete("userName");
};
