import { BadRequestError } from "@error/error";
import { validator } from "@helpers/validator/validator";
import { ValidationSource } from "@helpers/validator/validator.enum";
import asyncHandler from "@middlewares/asyncHandler";
import { SuccessCreateResponse } from "@response/response";
import express from "express";
import Joi from "joi";
import prisma from "src/common/database/prisma";
import bcrypt from "bcrypt";
import _ from "lodash";

const router = express.Router();

const signupSchema = Joi.object().keys({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export default router.post(
  "/",
  validator({ schema: signupSchema, source: ValidationSource.BODY }),
  asyncHandler(async (req, res) => {
    const emailExist = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (emailExist) throw new BadRequestError("Email already exist");

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
      },
    });

    new SuccessCreateResponse("Signup Successful", {
      user: _.omit(user, ["password"]),
    }).send(res);
  }),
);
