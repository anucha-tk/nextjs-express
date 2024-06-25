"use server";

import { apiFetch } from "../../utils/apiFetch";
import { isLoginResponse } from "../../utils/apiTypeGuard";
import { setAccessToken, setRefeshToken } from "../../utils/cookies";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await apiFetch<{ email: string; password: string }>({
    endpoint: "/api/v1/login",
    method: "POST",
    body: { email, password },
  });
  if (isLoginResponse(res)) {
    setAccessToken(res.data.tokens.accessToken);
    setRefeshToken(res.data.tokens.refreshToken);
  }
  return res;
};
