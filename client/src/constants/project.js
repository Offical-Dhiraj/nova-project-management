export const PROJECT_STATUS = {
  PLANNING: "PLANNING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
};

export const PROJECT_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
};

export const PROJECT_STATUS_OPTIONS = [
  {
    value: "PLANNING",
    label: "Planning",
  },
  {
    value: "IN_PROGRESS",
    label: "In progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "ON_HOLD",
    label: "On hold",
  },
];

export const PROJECT_PRIORITY_OPTIONS = [
  {
    value: "LOW",
    label: "Low",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HIGH",
    label: "High",
  },
  {
    value: "URGENT",
    label: "Urgent",
  },
];

export const getProjectStatusLabel = (status) => {
  const option = PROJECT_STATUS_OPTIONS.find(
    (item) => item.value === status,
  );

  return option?.label || "Unknown";
};

export const getProjectPriorityLabel = (priority) => {
  const option = PROJECT_PRIORITY_OPTIONS.find(
    (item) => item.value === priority,
  );

  return option?.label || "Unknown";
};