// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import morgan from "morgan";

// import { env } from "./config/env.js";
// import authRoutes from "./routes/auth.routes.js";
// import errorMiddleware from "./middleware/error.middleware.js";
// import projectRoutes from "./routes/project.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import userRoutes from "./routes/user.routes.js";

// const app = express();

// /**
//  * Security middleware
//  */
// app.use(helmet());

// /**
//  * CORS
//  */
// app.use(
//     cors({
//         origin: env.clientUrl,
//         credentials: true,
//     }),
// );

// /**
//  * Request parsing
//  */
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// /**
//  * Cookie parsing
//  */
// app.use(cookieParser());

// /**
//  * Rate limiting
//  */
// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     standardHeaders: "draft-8",
//     legacyHeaders: false,
//     message: {
//         success: false,
//         message: "Too many requests. Please try again later.",
//     },
// });

// app.use("/api", apiLimiter);

// /**
//  * HTTP request logging
//  */
// if (env.nodeEnv !== "test") {
//     app.use(morgan("dev"));
// }

// /**
//  * Health check
//  */
// app.get("/api/v1/health", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "NOVA API is running",
//         data: {
//             environment: env.nodeEnv,
//         },
//     });
// });

// /**
//  * Root API route
//  */
// app.get("/api/v1", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to NOVA API",
//         data: {
//             version: "v1",
//         },
//     });
// });

// /**
//  * 404 handler
//  */
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: `Route not found: ${req.originalUrl}`,
//     });
// });

// app.use("/api/v1/auth", authRoutes);
// app.use(errorMiddleware);
// app.use("/api/v1/projects", projectRoutes);
// app.use("/api/v1", taskRoutes);
// app.use("/api/v1/users", userRoutes);

// export default app;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

import AppError from "./utils/appError.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NOVA API is healthy",
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to NOVA API",
  });
});

/* Routes */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1", taskRoutes);

/* 404 */
app.use((req, res, next) => {
  next(
    new AppError(
      `Route not found: ${req.originalUrl}`,
      404,
    ),
  );
});

/* Global error handler */
app.use(errorMiddleware);

export default app;