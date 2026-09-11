import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";
import { AUTH_COOKIE_NAME } from "../constants/auth.constants.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
      throw new AppError(
        "Authentication required",
        401,
      );
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError(
        "User associated with this token no longer exists",
        401,
      );
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(
        new AppError("Invalid authentication token", 401),
      );
    }

    if (error.name === "TokenExpiredError") {
      return next(
        new AppError("Authentication token has expired", 401),
      );
    }

    next(error);
  }
};

export default protect;