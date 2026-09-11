import api from "../../services/api";

const extractData = (response) => {
  return response?.data?.data ?? response?.data;
};

const extractProject = (response) => {
  const data = extractData(response);

  return (
    data?.project ??
    data
  );
};

const extractProjects = (response) => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return data;
  }

  return data?.projects ?? [];
};

export const getProjects = async (params = {}) => {
  const response = await api.get("/projects", {
    params: {
      page: params.page || 1,
      limit: params.limit || 12,
      search: params.search || undefined,
      status: params.status || undefined,
      priority: params.priority || undefined,
    },
  });

  return {
    projects: extractProjects(response),
    pagination:
      extractData(response)?.pagination ||
      response?.data?.pagination ||
      null,
    raw: response.data,
  };
};

export const getProjectById = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}`,
  );

  return extractProject(response);
};

export const createProject = async (projectData) => {
  const response = await api.post(
    "/projects",
    projectData,
  );

  return extractProject(response);
};

export const updateProject = async (
  projectId,
  projectData,
) => {
  const response = await api.patch(
    `/projects/${projectId}`,
    projectData,
  );

  return extractProject(response);
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(
    `/projects/${projectId}`,
  );

  return response.data;
};

export const getProjectMembers = async (
  projectId,
) => {
  const response = await api.get(
    `/projects/${projectId}/members`,
  );

  const data = extractData(response);

  return (
    data?.members ||
    (Array.isArray(data) ? data : [])
  );
};

export const addProjectMember = async (
  projectId,
  userId,
) => {
  const response = await api.post(
    `/projects/${projectId}/members`,
    {
      userId,
    },
  );

  return extractProject(response);
};

export const removeProjectMember = async (
  projectId,
  userId,
) => {
  const response = await api.delete(
    `/projects/${projectId}/members/${userId}`,
  );

  return response.data;
};