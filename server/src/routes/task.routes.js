import express from "express";

import protect from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  create,
  listByProject,
  getOne,
  update,
  remove,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.get(
  "/projects/:projectId/tasks",
  asyncHandler(listByProject),
);

router.post(
  "/projects/:projectId/tasks",
  asyncHandler(create),
);

router.get(
  "/tasks/:id",
  asyncHandler(getOne),
);

router.patch(
  "/tasks/:id",
  asyncHandler(update),
);

router.delete(
  "/tasks/:id",
  asyncHandler(remove),
);

export default router;