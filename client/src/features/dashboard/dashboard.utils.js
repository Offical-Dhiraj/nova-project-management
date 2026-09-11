export const getId = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value._id || value.id || "";
};

export const getProjectProgress = (project) => {
  const tasks = project?._dashboardTasks || [];

  if (!tasks.length) {
    return project?.status === "COMPLETED"
      ? 100
      : 0;
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  return Math.round(
    (completedTasks / tasks.length) * 100,
  );
};

export const getDashboardStats = (projects, tasks) => {
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "IN_PROGRESS",
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED",
  ).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const reviewTasks = tasks.filter(
    (task) => task.status === "REVIEW",
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO",
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    if (task.status === "COMPLETED") {
      return false;
    }

    return new Date(task.dueDate) < new Date();
  }).length;

  return {
    totalProjects,
    activeProjects,
    completedProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
    reviewTasks,
    todoTasks,
    overdueTasks,
  };
};

export const getTaskCompletion = (tasks) => {
  if (!tasks.length) {
    return 0;
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  return Math.round(
    (completedTasks / tasks.length) * 100,
  );
};

export const getUpcomingTasks = (tasks, limit = 5) => {
  const now = new Date();

  return [...tasks]
    .filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      if (task.status === "COMPLETED") {
        return false;
      }

      return new Date(task.dueDate) >= now;
    })
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate),
    )
    .slice(0, limit);
};

/* Project status formatter */

export const formatProjectStatus = (status) => {
  const statusLabels = {
    PLANNING: "Planning",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    ON_HOLD: "On hold",
  };

  return statusLabels[status] || "Unknown";
};

/* Task status formatter */

export const formatTaskStatus = (status) => {
  const statusLabels = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    REVIEW: "Review",
    COMPLETED: "Completed",
  };

  return statusLabels[status] || "Unknown";
};