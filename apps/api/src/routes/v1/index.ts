import express from "express";
import signup from "./access/signup";
import login from "./access/login";
import getMe from "./access/getMe";
import refreshToken from "./access/refreshToken";
import hello from "./public/hello";

const router = express.Router();
// Public
router.use("/hello", hello);
// Auth
router.use("/signup", signup);
router.use("/login", login);
router.use("/getme", getMe);
router.use("/token/refresh", refreshToken);

export default router;
