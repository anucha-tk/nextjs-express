import asyncHandler from "@middlewares/asyncHandler";
import { User } from "@prisma/client";
import { SuccessResponse } from "@response/response";
import express from "express";
import _ from "lodash";
import { authMiddleware } from "src/common/auth/authMiddleware";

const router = express.Router();

router.use("/", authMiddleware);

export default router.get(
  "/",
  asyncHandler(async (req, res) => {
    const user: User = req.user;
    new SuccessResponse("Get Me Successful", {
      user: _.omit(user, ["password", "status", "createdAt", "updatedAt"]),
    }).send(res);
  }),
);
