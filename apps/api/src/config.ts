export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 3001;

export const jwt = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "abc",
  accessTokenValidity: process.env.ACCESS_TOKEN_VALIDITY || "15m",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "xyz",
  refreshTokenValidity: process.env.REFRESH_TOKEN_VALIDITY || "7d",
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};
