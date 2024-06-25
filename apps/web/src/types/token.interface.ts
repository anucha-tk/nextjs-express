import { ApiResponse } from "./api.interface";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse extends ApiResponse {
  data: {
    tokens: Tokens;
  };
}
