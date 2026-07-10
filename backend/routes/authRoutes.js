


router.post("/register", register);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/signin", signIn);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOtp);

router.post("/reset-password", resetPassword);

router.get('/search/:username', findUsers);