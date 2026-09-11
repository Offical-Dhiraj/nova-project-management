import {
  TASK_STATUS,
  TASK_PRIORITY,
} from "../constants/task.constants.js";

const validStatuses = Object.values(TASK_STATUS);
const validPriorities = Object.values(TASK_PRIORITY);

const normalizeLabels = (labels) => {
  if (labels === undefined) {
    return undefined;
  }

  if (!Array.isArray(labels)) {
    return null;
  }

  return [
    ...new Set(
      labels
        .map((label) => String(label).trim())
        .filter(Boolean),
    ),
  ];
};

const isValidDate = (value) => {
  if (!value) return true;

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

export const validateCreateTask = (data) => {
  const errors = [];

  const title = data.title?.trim();
  const description = data.description?.trim() || "";

  const status = data.status || TASK_STATUS.TODO;
  const priority = data.priority || TASK_PRIORITY.MEDIUM;

  const labels = normalizeLabels(data.labels);

  if (!title) {
    errors.push({
      field: "title",
      message: "Task title is required",
    });
  } else if (title.length < 2) {
    errors.push({
      field: "title",
      message: "Task title must be at least 2 characters",
    });
  } else if (title.length > 200) {
    errors.push({
      field: "title",
      message: "Task title cannot exceed 200 characters",
    });
  }

  if (description.length > 2000) {
    errors.push({
      field: "description",
      message: "Description cannot exceed 2000 characters",
    });
  }

  if (!validStatuses.includes(status)) {
    errors.push({
      field: "status",
      message: "Invalid task status",
    });
  }

  if (!validPriorities.includes(priority)) {
    errors.push({
      field: "priority",
      message: "Invalid task priority",
    });
  }

  if (!isValidDate(data.dueDate)) {
    errors.push({
      field: "dueDate",
      message: "Invalid due date",
    });
  }

  if (data.labels !== undefined && labels === null) {
    errors.push({
      field: "labels",
      message: "Labels must be an array",
    });
  }

  if (labels && labels.length > 10) {
    errors.push({
      field: "labels",
      message: "A task cannot have more than 10 labels",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,

    data: {
      title,
      description,
      status,
      priority,
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
      labels: labels || [],
      assignedTo: data.assignedTo || null,
    },
  };
};

export const validateUpdateTask = (data) => {
  const errors = [];
  const cleanData = {};

  if (data.title !== undefined) {
    const title = data.title.trim();

    if (title.length < 2 || title.length > 200) {
      errors.push({
        field: "title",
        message: "Task title must be between 2 and 200 characters",
      });
    } else {
      cleanData.title = title;
    }
  }

  if (data.description !== undefined) {
    const description = data.description.trim();

    if (description.length > 2000) {
      errors.push({
        field: "description",
        message: "Description cannot exceed 2000 characters",
      });
    } else {
      cleanData.description = description;
    }
  }

  if (data.status !== undefined) {
    if (!validStatuses.includes(data.status)) {
      errors.push({
        field: "status",
        message: "Invalid task status",
      });
    } else {
      cleanData.status = data.status;
    }
  }

  if (data.priority !== undefined) {
    if (!validPriorities.includes(data.priority)) {
      errors.push({
        field: "priority",
        message: "Invalid task priority",
      });
    } else {
      cleanData.priority = data.priority;
    }
  }

  if (data.dueDate !== undefined) {
    if (!isValidDate(data.dueDate)) {
      errors.push({
        field: "dueDate",
        message: "Invalid due date",
      });
    } else {
      cleanData.dueDate = data.dueDate
        ? new Date(data.dueDate)
        : null;
    }
  }

  if (data.labels !== undefined) {
    const labels = normalizeLabels(data.labels);

    if (labels === null) {
      errors.push({
        field: "labels",
        message: "Labels must be an array",
      });
    } else if (labels.length > 10) {
      errors.push({
        field: "labels",
        message: "A task cannot have more than 10 labels",
      });
    } else {
      cleanData.labels = labels;
    }
  }

  if (data.assignedTo !== undefined) {
    cleanData.assignedTo = data.assignedTo || null;
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: cleanData,
  };
};