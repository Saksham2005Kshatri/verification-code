import express from "express";
import userVerificationCode from "../controllers/verification.js";

const router = express.Router();

router.post("/", userVerificationCode);

export default router;
