import mongoose from "mongoose";

import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

const validateObjectId = (id, field = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
};

const isProjectMember = (project, userId) => {
  return project.members.some(
    (memberId) => memberId.toString() === userId.toString(),
  );
};

const canManageProject = (project, userId) => {
  return project.owner.toString() === userId.toString();
};

export const createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    owner: userId,
    members: [userId],
  });

  return Project.findById(project._id)
    .populate("owner", "name email avatar role")
    .populate("members", "name email avatar role");
};

export const getProjects = async ({
  userId,
  page = 1,
  limit = 10,
  search,
  status,
  priority,
}) => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    100,
  );

  const skip = (safePage - 1) * safeLimit;

  const filter = {
    $or: [
      { owner: userId },
      { members: userId },
    ],
  };

  if (search) {
    filter.$and = [
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  const [items, total] = await Promise.all([
    Project.find(filter)
      .populate("owner", "name email avatar role")
      .populate("members", "name email avatar role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    Project.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

export const getProjectById = async (
  projectId,
  userId,
) => {
  validateObjectId(projectId, "project ID");

  const project = await Project.findById(projectId)
    .populate("owner", "name email avatar role")
    .populate("members", "name email avatar role");

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const ownerId = project.owner._id.toString();

  const memberExists = project.members.some(
    (member) => member._id.toString() === userId.toString(),
  );

  if (
    ownerId !== userId.toString() &&
    !memberExists
  ) {
    throw new AppError(
      "You do not have access to this project",
      403,
    );
  }

  return project;
};

export const updateProject = async (
  projectId,
  userId,
  data,
) => {
  validateObjectId(projectId, "project ID");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (!canManageProject(project, userId)) {
    throw new AppError(
      "Only the project owner can update this project",
      403,
    );
  }

  Object.assign(project, data);

  await project.save();

  return Project.findById(project._id)
    .populate("owner", "name email avatar role")
    .populate("members", "name email avatar role");
};

export const deleteProject = async (
  projectId,
  userId,
) => {
  validateObjectId(projectId, "project ID");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (!canManageProject(project, userId)) {
    throw new AppError(
      "Only the project owner can delete this project",
      403,
    );
  }

  await project.deleteOne();

  return null;
};

export const getProjectMembers = async (
  projectId,
  userId,
) => {
  validateObjectId(projectId, "project ID");

  const project = await Project.findById(projectId)
    .populate("members", "name email avatar role");

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (
    project.owner.toString() !== userId &&
    !isProjectMember(project, userId)
  ) {
    throw new AppError(
      "You do not have access to this project",
      403,
    );
  }

  return project.members;
};

export const addProjectMember = async (
  projectId,
  userId,
  memberId,
) => {
  validateObjectId(projectId, "project ID");
  validateObjectId(memberId, "member ID");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (!canManageProject(project, userId)) {
    throw new AppError(
      "Only the project owner can add members",
      403,
    );
  }

  const member = await User.findById(memberId);

  if (!member) {
    throw new AppError("User not found", 404);
  }

  const alreadyMember = isProjectMember(
    project,
    memberId,
  );

  if (alreadyMember) {
    throw new AppError(
      "User is already a project member",
      409,
    );
  }

  project.members.push(memberId);

  await project.save();

  return Project.findById(project._id)
    .populate("owner", "name email avatar role")
    .populate("members", "name email avatar role");
};

export const removeProjectMember = async (
  projectId,
  userId,
  memberId,
) => {
  validateObjectId(projectId, "project ID");
  validateObjectId(memberId, "member ID");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (!canManageProject(project, userId)) {
    throw new AppError(
      "Only the project owner can remove members",
      403,
    );
  }

  if (project.owner.toString() === memberId) {
    throw new AppError(
      "The project owner cannot be removed",
      400,
    );
  }

  const memberExists = isProjectMember(
    project,
    memberId,
  );

  if (!memberExists) {
    throw new AppError(
      "User is not a project member",
      404,
    );
  }

  project.members = project.members.filter(
    (id) => id.toString() !== memberId,
  );

  await project.save();

  return Project.findById(project._id)
    .populate("owner", "name email avatar role")
    .populate("members", "name email avatar role");
};