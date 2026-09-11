export const validateProject = (values) => {
  const errors = {};

  const name = values.name?.trim();
  const description =
    values.description?.trim();

  if (!name) {
    errors.name =
      "Project name is required.";
  } else if (name.length < 2) {
    errors.name =
      "Project name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name =
      "Project name cannot exceed 100 characters.";
  }

  if (
    description &&
    description.length > 1000
  ) {
    errors.description =
      "Description cannot exceed 1000 characters.";
  }

  if (
    values.startDate &&
    values.dueDate &&
    new Date(values.dueDate) <
      new Date(values.startDate)
  ) {
    errors.dueDate =
      "Due date cannot be before the start date.";
  }

  const validStatuses = [
    "PLANNING",
    "IN_PROGRESS",
    "COMPLETED",
    "ON_HOLD",
  ];

  if (
    values.status &&
    !validStatuses.includes(
      values.status,
    )
  ) {
    errors.status =
      "Invalid project status.";
  }

  const validPriorities = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ];

  if (
    values.priority &&
    !validPriorities.includes(
      values.priority,
    )
  ) {
    errors.priority =
      "Invalid project priority.";
  }

  return errors;
};