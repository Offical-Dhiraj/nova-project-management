import api from "../../services/api";

export const getMembers =
  async (params = {}) => {
    const response =
      await api.get("/users", {
        params,
      });

    return response.data;
  };

export const getMemberById =
  async (id) => {
    const response =
      await api.get(`/users/${id}`);

    return response.data;
  };