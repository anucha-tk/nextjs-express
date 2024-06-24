"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 200 && res.ok) {
    const { data } = await res.json();
    // NOTE: we use UTC time
    const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    cookies().set("accessToken", data.tokens.accessToken, {
      httpOnly: true,
      secure: true, // Make sure to set secure:true if using HTTPS
      expires: accessTokenExpires,
    });

    cookies().set("refreshToken", data.tokens.refreshToken, {
      secure: true, // Make sure to set secure:true if using HTTPS
      expires: refreshTokenExpires,
    });
    return { success: true, user: data.user };
  }
  return { success: false, message: "Credential Error" };
};
