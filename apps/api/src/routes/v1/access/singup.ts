import express from "express";
import { SuccessCreateResponse } from "../../../common/response/response";

const router = express.Router();

export default router.post("/", (req, res) => {
  new SuccessCreateResponse("Signup Successful", {
    user: "signup",
  }).send(res);
});
