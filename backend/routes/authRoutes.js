
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/register", authControllers.register);

router.post("/send-otp", authControllers.sendOtp);

router.post("/verify-otp", authControllers.verifyOtp);

router.post("/signin", authControllers.signIn);

router.post("/forgot-password", authControllers.forgotPassword);

router.post("/verify-reset-otp", authControllers.verifyResetOtp);

router.post("/reset-password", authControllers.resetPassword);

router.get('/search/:username', authControllers.findUsers);

module.exports = router;