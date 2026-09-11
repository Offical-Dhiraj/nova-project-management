import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import {
  getUserById,
  getUsers,
} from "../services/user.service.js";
import { validateUserQuery } from "../validators/user.validator.js";

export const listUsers = asyncHandler(async (req, res) => {
  const validation = validateUserQuery(req.query);

  if (!validation.isValid) {
    throw new AppError("Validation failed", 400, validation.errors);
  }

  const result = await getUsers({
    search: validation.data.search,
    page: req.query.page,
    limit: req.query.limit,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getOneUser = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});