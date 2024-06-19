import { validator } from "@helpers/validator/validator";
import { ValidationSource } from "@helpers/validator/validator.enum";
import asyncHandler from "@middlewares/asyncHandler";
import { SuccessCreateResponse } from "@response/response";
import express from "express";
import Joi from "joi";

const router = express.Router();

const signupSchema = Joi.object().keys({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export default router.post(
  "/",
  validator({ schema: signupSchema, source: ValidationSource.BODY }),
  asyncHandler(async (req, res) => {
    new SuccessCreateResponse("Signup Successful", {
      user: "signup",
    }).send(res);
  }),
);
