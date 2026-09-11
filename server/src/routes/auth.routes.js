import express from "express";

import {
  register,
  login,
  logout,
  me,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(register),
);

router.post(
  "/login",
  asyncHandler(login),
);

router.post(
  "/logout",
  asyncHandler(logout),
);

router.get(
  "/me",
  protect,
  asyncHandler(me),
);

export default router;