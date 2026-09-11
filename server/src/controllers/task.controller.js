import {
  createTask,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

import {
  validateCreateTask,
  validateUpdateTask,
} from "../validators/task.validator.js";

import AppError from "../utils/appError.js";

export const create = async (req, res) => {
  const validation = validateCreateTask(
    req.body,
  );

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const task = await createTask(
    req.params.projectId,
    req.user.id,
    validation.data,
  );

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: {
      task,
    },
  });
};

export const listByProject = async (req, res) => {
  const result = await getProjectTasks({
    projectId: req.params.projectId,
    userId: req.user.id,

    page: req.query.page,
    limit: req.query.limit,

    search: req.query.search,
    status: req.query.status,
    priority: req.query.priority,
    assignedTo: req.query.assignedTo,
    dueDate: req.query.dueDate,
  });

  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: result,
  });
};

export const getOne = async (req, res) => {
  const task = await getTaskById(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Task retrieved successfully",
    data: {
      task,
    },
  });
};

export const update = async (req, res) => {
  const validation = validateUpdateTask(
    req.body,
  );

  if (!validation.isValid) {
    throw new AppError(
      "Validation failed",
      400,
      validation.errors,
    );
  }

  const task = await updateTask(
    req.params.id,
    req.user.id,
    validation.data,
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: {
      task,
    },
  });
};

export const remove = async (req, res) => {
  await deleteTask(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: null,
  });
};