import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
} from "../services/project.service.js";

import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/project.validator.js";

import AppError from "../utils/appError.js";

export const create = async (req, res) => {
  const validation = validateCreateProject(req.body);

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const project = await createProject(
    validation.data,
    req.user.id,
  );

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: {
      project,
    },
  });
};

export const list = async (req, res) => {
  const result = await getProjects({
    userId: req.user.id,
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
    status: req.query.status,
    priority: req.query.priority,
  });

  res.status(200).json({
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
};

export const getOne = async (req, res) => {
  const project = await getProjectById(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Project retrieved successfully",
    data: {
      project,
    },
  });
};

export const update = async (req, res) => {
  const validation = validateUpdateProject(req.body);

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const project = await updateProject(
    req.params.id,
    req.user.id,
    validation.data,
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: {
      project,
    },
  });
};

export const remove = async (req, res) => {
  await deleteProject(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data: null,
  });
};

export const members = async (req, res) => {
  const members = await getProjectMembers(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Project members retrieved successfully",
    data: {
      members,
    },
  });
};

export const addMember = async (req, res) => {
  if (!req.body.userId) {
    throw new AppError(
      "userId is required",
      400,
    );
  }

  const project = await addProjectMember(
    req.params.id,
    req.user.id,
    req.body.userId,
  );

  res.status(200).json({
    success: true,
    message: "Member added successfully",
    data: {
      project,
    },
  });
};

export const removeMember = async (req, res) => {
  const project = await removeProjectMember(
    req.params.id,
    req.user.id,
    req.params.userId,
  );

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
    data: {
      project,
    },
  });
};