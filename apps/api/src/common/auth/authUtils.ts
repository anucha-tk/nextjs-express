import { AuthFailureError, BadTokenError } from "@error/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt as jwtConfig } from "src/config";
import { CustomJWTPayload } from "./jwt.interface";

const {
  accessTokenValidity,
  refreshTokenValidity,
  accessTokenSecret,
  refreshTokenSecret,
  issuer,
  audience,
} = jwtConfig;

/**
 * Get AccessToken from request header
 * @param authorization string header
 * @example req.headers.authorization
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
 * @returns payload CustomJWTPayload
 * */
export const validateTokenData = (payload: JwtPayload): CustomJWTPayload => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== issuer ||
    payload.aud !== audience
  ) {
    throw new AuthFailureError("Invalid Token");
  }
  // convert sub to number
  const sub = +payload.sub;

  return { ...payload, sub } as CustomJWTPayload;
};

/**
 * Validate Refresh Token with jwt verify and validateTokenData
 * @param token string
 * @returns CustomJWTPayload
 * */
export const validateRefreshToken = (token: string): CustomJWTPayload => {
  try {
    const decoded = jwt.verify(token, refreshTokenSecret) as JwtPayload;

    return validateTokenData(decoded);
  } catch (err) {
    throw new BadTokenError("Invalid refresh token");
  }
};

/**
 * Create Access Token and Refresh Token
 * @param id string user id
 * @returns accessToken, refreshToken string
 * */
export const createToken = (
  id: string,
): { accessToken: string; refreshToken: string } => {
  const payload = {
    sub: id.toString(),
  };
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenValidity,
    issuer,
    audience,
  });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenValidity,
    issuer,
    audience,
  });

  return {
    accessToken,
    refreshToken,
  };
};
