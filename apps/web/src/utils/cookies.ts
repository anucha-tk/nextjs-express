"use server";

import { cookies } from "next/headers";

export const getAccessToken = () => {
  return cookies().get("accessToken")?.value;
};

export const getRefeshToken = () => {
  return cookies().get("refreshToken")?.value;
};

export const setAccessToken = (token: string) => {
  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  cookies().set("accessToken", token, {
    httpOnly: true,
    secure: true, // Make sure to set secure:true if using HTTPS
    expires: accessTokenExpires,
  });
};

export const setRefreshToken = (token: string) => {
  const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  cookies().set("refreshToken", token, {
    httpOnly: true,
    secure: true, // Make sure to set secure:true if using HTTPS
    expires: refreshTokenExpires,
  });
};

export const setAuth = (firstName: string) => {
  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  cookies().set("isAuthenticated", "true", {
    expires: accessTokenExpires,
  });
  cookies().set("userName", firstName, {
    expires: accessTokenExpires,
  });
};
