import { ApiResponse, LoginResponse } from "../types/api.interface";
import { TokenResponse } from "../types/token.interface";

export function isApiResponse(data: any): data is ApiResponse {
  return data && typeof data.message === "string";
}

export function isLoginResponse(data: any): data is LoginResponse {
  return data && data.data && data.data.user && data.data.tokens;
}

export function isTokenResponse(data: any): data is TokenResponse {
  return data && data.data && data.data.tokens;
}
