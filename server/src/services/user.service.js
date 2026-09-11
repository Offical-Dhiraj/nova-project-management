import mongoose from "mongoose";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

const validateObjectId = (id, field = "userId") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const getUsers = async ({ search, page = 1, limit = 20 }) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const filter = {};

  if (search) {
    const searchRegex = new RegExp(
      search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );

    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
    ];
  }

  const skip = (currentPage - 1) * currentLimit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("name email avatar role createdAt updatedAt")
      .sort({ name: 1 })
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    User.countDocuments(filter),
  ]);

  return {
    users: users.map(sanitizeUser),
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages: Math.ceil(total / currentLimit),
      hasNextPage: currentPage < Math.ceil(total / currentLimit),
      hasPreviousPage: currentPage > 1,
    },
  };
};

export const getUserById = async (userId) => {
  validateObjectId(userId);

  const user = await User.findById(userId)
    .select("name email avatar role createdAt updatedAt")
    .lean();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUser(user);
};