"use server";

import { apiFetch } from "../../utils/apiFetch";

export const getMe = async (token: string) => {
  return apiFetch({
    method: "GET",
    endpoint: "/api/v1/getme",
    accessToken: token,
  });
};
