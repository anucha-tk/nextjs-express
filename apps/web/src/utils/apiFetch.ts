import { BASE_URL } from "../constants/baseurl";
import { APIFetch, ApiResponse } from "../types/api.interface";
import { isApiResponse } from "./apiTypeGuard";

export const apiFetch = async <T>({
  endpoint,
  method,
  body,
  accessToken,
}: APIFetch<T>): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (accessToken) {
    res.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const data = await res.json();
  if (isApiResponse(data)) {
    return data;
  } else {
    throw new Error("ApiResponse type invalid");
  }
};
