import { AuthFailureError, BadTokenError } from "@error/error";
import { validator } from "@helpers/validator/validator";
import { ValidationSource } from "@helpers/validator/validator.enum";
import asyncHandler from "@middlewares/asyncHandler";
import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import prisma from "src/common/database/prisma";
import { SuccessResponse } from "@response/response";
import _ from "lodash";
import { createToken } from "src/common/auth/authUtils";

const routes = express.Router();

const loginSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

routes.post(
  "/",
  validator({ schema: loginSchema, source: ValidationSource.BODY }),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) throw new BadTokenError("User not exist");
    if (!user.status) throw new AuthFailureError("User not approve");
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!comparePassword) throw new AuthFailureError("Password miss match");
    const { accessToken, refreshToken } = createToken(user);

    await prisma.keystore.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    new SuccessResponse("Login success", {
      user: _.omit(user, ["password", "status", "createdAt", "updatedAt"]),
      tokens: {
        accessToken,
        refreshToken,
      },
    }).send(res);
  }),
);
export default routes;
