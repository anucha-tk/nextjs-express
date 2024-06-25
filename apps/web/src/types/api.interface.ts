import { Tokens } from "./token.interface";
import { User } from "./user.interface";

export interface ApiResponse {
  statusCode: string;
  message: string;
}

export interface LoginResponse extends ApiResponse {
  data: {
    user: User;
    tokens: Tokens;
  };
}

export interface APIFetch<T> {
  endpoint: string;
  method: string;
  body?: T;
  accessToken?: string;
}
