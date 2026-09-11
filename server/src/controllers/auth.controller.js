import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";

import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "../constants/auth.constants.js";
import AppError from "../utils/appError.js";

export const register = async (req, res) => {
  const validation = validateRegister(req.body);

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const { user, token } = await registerUser(validation.data);

  res.cookie(
    AUTH_COOKIE_NAME,
    token,
    AUTH_COOKIE_OPTIONS,
  );

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: {
      user,
    },
  });
};

export const login = async (req, res) => {
  const validation = validateLogin(req.body);

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const { user, token } = await loginUser(validation.data);

  res.cookie(
    AUTH_COOKIE_NAME,
    token,
    AUTH_COOKIE_OPTIONS,
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user,
    },
  });
};

export const logout = async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
    data: null,
  });
};

export const me = async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully",
    data: {
      user,
    },
  });
};