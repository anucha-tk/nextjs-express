export interface CustomJWTPayload {
  sub: number;
  aud: string;
  iss: string;
  iat: number;
  exp: number;
}
