import { cookies } from "next/headers";

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
    secure: true, // Make sure to set secure:true if using HTTPS
    expires: refreshTokenExpires,
  });
};

export const removeAccessToken = () => {
  cookies().delete("accessToken");
};

export const removeRefeshToken = () => {
  cookies().delete("refreshToken");
};

export const removeAuthCookie = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
