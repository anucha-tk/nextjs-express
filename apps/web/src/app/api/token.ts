"use server";

import { apiFetch } from "../../utils/apiFetch";

export const token = async (accessToken: string, refreshToken: string) => {
  return apiFetch({
    endpoint: "/api/v1/token/refresh",
    method: "POST",
    accessToken,
    body: { refreshToken },
  });
};
