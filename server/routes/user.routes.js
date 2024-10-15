const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/user.controller");

// router obj
const router = express.Router();

// routes
// * REGISTER || POST || /api/v1/auth/register
router.post("/register", registerController);

// * LOGIN || POST || /api/v1/auth/login
router.post("/login", loginController);

// * UPDATE USER PROFILE || PUT || /api/v1/auth/update-user
router.put("/update-user", requireSignIn, updateUserController);

// export
module.exports = router;