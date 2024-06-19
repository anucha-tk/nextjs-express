import asyncHandler from "@middlewares/asyncHandler";
import { SuccessCreateResponse } from "@response/response";
import express from "express";

const router = express.Router();

export default router.post(
  "/",
  asyncHandler(async (req, res) => {
    new SuccessCreateResponse("Signup Successful", {
      user: "signup",
    }).send(res);
  }),
);
