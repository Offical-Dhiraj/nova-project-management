export const TASK_STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  REVIEW: "REVIEW",
  COMPLETED: "COMPLETED",
};

export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
};

export const TASK_STATUS_OPTIONS = [
  {
    value: TASK_STATUS.TODO,
    label: "To Do",
  },
  {
    value: TASK_STATUS.IN_PROGRESS,
    label: "In Progress",
  },
  {
    value: TASK_STATUS.REVIEW,
    label: "Review",
  },
  {
    value: TASK_STATUS.COMPLETED,
    label: "Completed",
  },
];

export const TASK_PRIORITY_OPTIONS = [
  {
    value: TASK_PRIORITY.LOW,
    label: "Low",
  },
  {
    value: TASK_PRIORITY.MEDIUM,
    label: "Medium",
  },
  {
    value: TASK_PRIORITY.HIGH,
    label: "High",
  },
  {
    value: TASK_PRIORITY.URGENT,
    label: "Urgent",
  },
];