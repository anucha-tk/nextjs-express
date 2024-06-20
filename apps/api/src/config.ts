// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 3001;

// JWT
export const jwt = {
  secretKey: process.env.SECRET_JWT_KEY,
};
