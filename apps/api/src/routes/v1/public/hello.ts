import asyncHandler from "@middlewares/asyncHandler";
import { SuccessMsgResponse } from "@response/response";
import express from "express";

const router = express.Router();

export default router.get(
  "/",
  asyncHandler(async (_, res) => {
    new SuccessMsgResponse("Hello").send(res);
  }),
);
