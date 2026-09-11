import api from "../../services/api";

export const getProjectTasks =
  async (
    projectId,
    params = {},
  ) => {
    const response =
      await api.get(
        `/projects/${projectId}/tasks`,
        { params },
      );

    return response.data;
  };

export const getTaskById =
  async (id) => {
    const response =
      await api.get(`/tasks/${id}`);

    return response.data;
  };

export const createTask =
  async (
    projectId,
    data,
  ) => {
    const response =
      await api.post(
        `/projects/${projectId}/tasks`,
        data,
      );

    return response.data;
  };

export const updateTask =
  async (id, data) => {
    const response =
      await api.patch(
        `/tasks/${id}`,
        data,
      );

    return response.data;
  };

export const deleteTask =
  async (id) => {
    const response =
      await api.delete(
        `/tasks/${id}`,
      );

    return response.data;
  };