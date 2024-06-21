import express from "express";
import signup from "./access/signup";
import login from "./access/login";
import getMe from "./access/getMe";
import refreshToken from "./access/refreshToken";

const router = express.Router();

// Auth
router.use("/signup", signup);
router.use("/login", login);
router.use("/getme", getMe);
router.use("/token/refresh", refreshToken);

export default router;
