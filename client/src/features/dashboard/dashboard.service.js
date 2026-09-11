import api from "../../services/api";

const extractItems = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.projects)) {
    return data.projects;
  }

  if (Array.isArray(data?.tasks)) {
    return data.tasks;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

export const getDashboardProjects =
  async () => {
    const response = await api.get(
      "/projects",
      {
        params: {
          page: 1,
          limit: 100,
        },
      },
    );

    return {
      projects: extractItems(response),
      raw: response.data,
    };
  };

export const getProjectTasks =
  async (projectId) => {
    const response = await api.get(
      `/projects/${projectId}/tasks`,
      {
        params: {
          page: 1,
          limit: 100,
        },
      },
    );

    return {
      tasks: extractItems(response),
      raw: response.data,
    };
  };