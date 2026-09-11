import {
  PROJECT_STATUS,
  PROJECT_PRIORITY,
} from "../constants/project.constants.js";

const validStatuses = Object.values(PROJECT_STATUS);
const validPriorities = Object.values(PROJECT_PRIORITY);

const isValidDate = (value) => {
  if (!value) return true;

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

export const validateCreateProject = (data) => {
  const errors = [];

  const name = data.name?.trim();
  const description = data.description?.trim() || "";
  const status = data.status || PROJECT_STATUS.PLANNING;
  const priority = data.priority || PROJECT_PRIORITY.MEDIUM;

  if (!name) {
    errors.push({
      field: "name",
      message: "Project name is required",
    });
  } else if (name.length < 2) {
    errors.push({
      field: "name",
      message: "Project name must be at least 2 characters",
    });
  } else if (name.length > 100) {
    errors.push({
      field: "name",
      message: "Project name cannot exceed 100 characters",
    });
  }

  if (description.length > 1000) {
    errors.push({
      field: "description",
      message: "Description cannot exceed 1000 characters",
    });
  }

  if (!validStatuses.includes(status)) {
    errors.push({
      field: "status",
      message: "Invalid project status",
    });
  }

  if (!validPriorities.includes(priority)) {
    errors.push({
      field: "priority",
      message: "Invalid project priority",
    });
  }

  if (!isValidDate(data.startDate)) {
    errors.push({
      field: "startDate",
      message: "Invalid start date",
    });
  }

  if (!isValidDate(data.dueDate)) {
    errors.push({
      field: "dueDate",
      message: "Invalid due date",
    });
  }

  if (
    data.startDate &&
    data.dueDate &&
    new Date(data.dueDate) < new Date(data.startDate)
  ) {
    errors.push({
      field: "dueDate",
      message: "Due date cannot be before start date",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name,
      description,
      status,
      priority,
      startDate: data.startDate
        ? new Date(data.startDate)
        : null,
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
    },
  };
};

export const validateUpdateProject = (data) => {
  const errors = [];
  const cleanData = {};

  if (data.name !== undefined) {
    const name = data.name.trim();

    if (name.length < 2 || name.length > 100) {
      errors.push({
        field: "name",
        message: "Project name must be between 2 and 100 characters",
      });
    } else {
      cleanData.name = name;
    }
  }

  if (data.description !== undefined) {
    const description = data.description.trim();

    if (description.length > 1000) {
      errors.push({
        field: "description",
        message: "Description cannot exceed 1000 characters",
      });
    } else {
      cleanData.description = description;
    }
  }

  if (data.status !== undefined) {
    if (!validStatuses.includes(data.status)) {
      errors.push({
        field: "status",
        message: "Invalid project status",
      });
    } else {
      cleanData.status = data.status;
    }
  }

  if (data.priority !== undefined) {
    if (!validPriorities.includes(data.priority)) {
      errors.push({
        field: "priority",
        message: "Invalid project priority",
      });
    } else {
      cleanData.priority = data.priority;
    }
  }

  if (data.startDate !== undefined) {
    if (!isValidDate(data.startDate)) {
      errors.push({
        field: "startDate",
        message: "Invalid start date",
      });
    } else {
      cleanData.startDate = data.startDate
        ? new Date(data.startDate)
        : null;
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

  if (
    cleanData.startDate &&
    cleanData.dueDate &&
    cleanData.dueDate < cleanData.startDate
  ) {
    errors.push({
      field: "dueDate",
      message: "Due date cannot be before start date",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: cleanData,
  };
};