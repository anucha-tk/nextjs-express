import { AuthFailureError } from "@error/error";
import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt as jwtConfig } from "src/config";

/**
 * Get AccessToken
 * @param authorization string accessToken from request header
 * @returns token string
 * */
export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError("Not found Authorization");
  if (!authorization.startsWith("Bearer"))
    throw new AuthFailureError("Invalid Authorization");
  return authorization.split(" ")[1];
};

/**
 * Validate Token Data
 * @param payload JwtPayload
 * @returns boolean
 * */
export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== jwtConfig.issuer ||
    payload.aud !== jwtConfig.audience
  ) {
    throw new AuthFailureError("Invalid Access Token");
  }

  return true;
};

/**
 * Create Token
 * @param user User
 * @returns accessToken, refreshToken string
 * */
export const createToken = (
  user: User,
): { accessToken: string; refreshToken: string } => {
  const payload = {
    sub: user.id.toString(),
  };
  const accessToken = jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenValidity,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
  });
  const refreshToken = jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenValidity,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
  });
  return {
    accessToken,
    refreshToken,
  };
};
