import { AuthFailureError } from "@error/error";
import { validator } from "@helpers/validator/validator";
import { ValidationSource } from "@helpers/validator/validator.enum";
import asyncHandler from "@middlewares/asyncHandler";
import { SuccessResponse } from "@response/response";
import express from "express";
import Joi from "joi";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  createToken,
  getAccessToken,
  validateRefreshToken,
  validateTokenData,
} from "src/common/auth/authUtils";
import prisma from "src/common/database/prisma";

const router = express.Router();

const schema = Joi.object().keys({
  refreshToken: Joi.string().required().min(1),
});

export default router.post(
  "/",
  validator({ schema, source: ValidationSource.BODY }),
  asyncHandler(async (req, res) => {
    const accessTokenStr = getAccessToken(req.headers.authorization);
    const payload = jwt.decode(accessTokenStr) as JwtPayload;
    const accessTokenPayload = validateTokenData(payload);

    const user = await prisma.user.findUnique({
      where: { id: accessTokenPayload.sub },
    });
    if (!user) throw new AuthFailureError("User not found");

    const refreshTokenPayload = validateRefreshToken(req.body.refreshToken);
    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      throw new AuthFailureError("Access token and refresh token mismatch");
    }
    const keystore = await prisma.keystore.findFirst({
      where: { token: req.body.refreshToken },
    });
    if (!keystore) {
      throw new AuthFailureError("Invalid refresh token");
    }
    await prisma.keystore.deleteMany({ where: { userId: user.id } });
    const { accessToken, refreshToken } = createToken(user.id.toString());
    await prisma.keystore.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    new SuccessResponse("Refresh Token success", {
      tokens: {
        accessToken,
        refreshToken,
      },
    }).send(res);
  }),
);
