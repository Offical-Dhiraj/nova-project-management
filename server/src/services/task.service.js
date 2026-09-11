import mongoose from "mongoose";

import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

const validateObjectId = (id, field = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
};

const hasProjectAccess = (project, userId) => {
  if (project.owner.toString() === userId.toString()) {
    return true;
  }

  return project.members.some(
    (memberId) => memberId.toString() === userId.toString(),
  );
};

const isProjectOwner = (project, userId) => {
  return project.owner.toString() === userId.toString();
};

const getProject = async (projectId) => {
  validateObjectId(projectId, "project ID");

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

const validateAssignee = async (
  project,
  assignedTo,
) => {
  if (!assignedTo) {
    return null;
  }

  validateObjectId(assignedTo, "assignee ID");

  const user = await User.findById(assignedTo);

  if (!user) {
    throw new AppError("Assignee not found", 404);
  }

  const isMember = project.members.some(
    (memberId) =>
      memberId.toString() === assignedTo.toString(),
  );

  if (!isMember) {
    throw new AppError(
      "Task can only be assigned to a project member",
      400,
    );
  }

  return assignedTo;
};

const populateTask = (query) => {
  return query
    .populate(
      "assignedTo",
      "name email avatar role",
    )
    .populate(
      "createdBy",
      "name email avatar role",
    )
    .populate(
      "project",
      "name status priority owner members",
    );
};

export const createTask = async (
  projectId,
  userId,
  data,
) => {
  const project = await getProject(projectId);

  if (!hasProjectAccess(project, userId)) {
    throw new AppError(
      "You do not have access to this project",
      403,
    );
  }

  const assignedTo = await validateAssignee(
    project,
    data.assignedTo,
  );

  const task = await Task.create({
    ...data,
    project: projectId,
    createdBy: userId,
    assignedTo,
  });

  return populateTask(
    Task.findById(task._id),
  );
};

export const getProjectTasks = async ({
  projectId,
  userId,
  page = 1,
  limit = 10,
  search,
  status,
  priority,
  assignedTo,
  dueDate,
}) => {
  const project = await getProject(projectId);

  if (!hasProjectAccess(project, userId)) {
    throw new AppError(
      "You do not have access to this project",
      403,
    );
  }

  const safePage = Math.max(Number(page) || 1, 1);

  const safeLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    100,
  );

  const skip = (safePage - 1) * safeLimit;

  const filter = {
    project: projectId,
  };

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        labels: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (assignedTo) {
    validateObjectId(
      assignedTo,
      "assignee ID",
    );

    filter.assignedTo = assignedTo;
  }

  if (dueDate === "overdue") {
    filter.dueDate = {
      $lt: new Date(),
    };

    filter.status = {
      $ne: "COMPLETED",
    };
  }

  if (dueDate === "upcoming") {
    const today = new Date();

    const nextSevenDays = new Date();
    nextSevenDays.setDate(
      nextSevenDays.getDate() + 7,
    );

    filter.dueDate = {
      $gte: today,
      $lte: nextSevenDays,
    };
  }

  const [items, total] = await Promise.all([
    populateTask(
      Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit),
    ).lean(),

    Task.countDocuments(filter),
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

export const getTaskById = async (
  taskId,
  userId,
) => {
  validateObjectId(taskId, "task ID");

  const task = await populateTask(
    Task.findById(taskId),
  );

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const project = await Project.findById(
    task.project._id,
  );

  if (!project) {
    throw new AppError(
      "Associated project not found",
      404,
    );
  }

  if (!hasProjectAccess(project, userId)) {
    throw new AppError(
      "You do not have access to this task",
      403,
    );
  }

  return task;
};

export const updateTask = async (
  taskId,
  userId,
  data,
) => {
  validateObjectId(taskId, "task ID");

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const project = await getProject(
    task.project,
  );

  if (!hasProjectAccess(project, userId)) {
    throw new AppError(
      "You do not have access to this task",
      403,
    );
  }

  if (data.assignedTo !== undefined) {
    data.assignedTo = await validateAssignee(
      project,
      data.assignedTo,
    );
  }

  Object.assign(task, data);

  await task.save();

  return populateTask(
    Task.findById(task._id),
  );
};

export const deleteTask = async (
  taskId,
  userId,
) => {
  validateObjectId(taskId, "task ID");

  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const project = await getProject(
    task.project,
  );

  if (!hasProjectAccess(project, userId)) {
    throw new AppError(
      "You do not have access to this task",
      403,
    );
  }

  /*
   * Current policy:
   * Project owners can delete tasks.
   */
  if (!isProjectOwner(project, userId)) {
    throw new AppError(
      "Only the project owner can delete tasks",
      403,
    );
  }

  await task.deleteOne();

  return null;
};