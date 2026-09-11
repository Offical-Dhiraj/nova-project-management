import express from "express";

import protect from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  create,
  list,
  getOne,
  update,
  remove,
  members,
  addMember,
  removeMember,
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(asyncHandler(list))
  .post(asyncHandler(create));

router
  .route("/:id")
  .get(asyncHandler(getOne))
  .patch(asyncHandler(update))
  .delete(asyncHandler(remove));

router.get(
  "/:id/members",
  asyncHandler(members),
);

router.post(
  "/:id/members",
  asyncHandler(addMember),
);

router.delete(
  "/:id/members/:userId",
  asyncHandler(removeMember),
);

export default router;