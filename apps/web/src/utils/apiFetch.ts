import { BASE_URL } from "../constants/baseurl";
import { APIFetch, ApiResponse } from "../types/api.interface";
import { isApiResponse } from "./apiTypeGuard";

export const apiFetch = async <T>({
  endpoint,
  method,
  body,
  accessToken,
}: APIFetch<T>): Promise<ApiResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (isApiResponse(data)) {
    return data;
  } else {
    throw new Error("ApiResponse type invalid");
  }
};
