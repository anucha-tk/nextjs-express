import express from "express";
import singup from "./access/singup";

const router = express.Router();

router.use("/signup", singup);

export default router;
