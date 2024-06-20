import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { jwt as jwtConfig } from "src/config";

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    status: user.status,
  };
  const token = jwt.sign(payload, jwtConfig.secretKey || "abcdef", {
    expiresIn: "10s",
  });
  return token;
};
