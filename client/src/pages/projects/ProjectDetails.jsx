import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  deleteProject,
  getProject,
  updateProject,
} from "../../services/project.service";

import {
  getProjectTasks,
} from "../../services/task.service";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [editing, setEditing] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
  });

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        projectResponse,
        tasksResponse,
      ] = await Promise.all([
        getProject(projectId),
        getProjectTasks(projectId, {
          page: 1,
          limit: 100,
        }),
      ]);

      const projectData =
        projectResponse?.data?.project ||
        projectResponse?.data;

      const taskData =
        tasksResponse?.data?.tasks ||
        tasksResponse?.data ||
        [];

      setProject(projectData);
      setTasks(Array.isArray(taskData) ? taskData : []);

      setFormData({
        name: projectData?.name || "",
        description: projectData?.description || "",
        status: projectData?.status || "PLANNING",
        priority: projectData?.priority || "MEDIUM",
        startDate: projectData?.startDate
          ? projectData.startDate.slice(0, 10)
          : "",
        dueDate: projectData?.dueDate
          ? projectData.dueDate.slice(0, 10)
          : "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load project.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const progress = useMemo(() => {
    if (!tasks.length) {
      return {
        total: 0,
        completed: 0,
        percentage: 0,
      };
    }

    const completed = tasks.filter(
      (task) => task.status === "COMPLETED",
    ).length;

    return {
      total: tasks.length,
      completed,
      percentage: Math.round(
        (completed / tasks.length) * 100,
      ),
    };
  }, [tasks]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        startDate: formData.startDate || null,
        dueDate: formData.dueDate || null,
      };

      const response = await updateProject(
        projectId,
        payload,
      );

      const updatedProject =
        response?.data?.project ||
        response?.data;

      setProject(updatedProject);
      setEditing(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update project.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteProject(projectId);

      navigate("/projects");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete project.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-state">
        Loading project...
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="page-state error-state">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page-state">
        Project not found.
      </div>
    );
  }

  return (
    <section className="project-details-page">
      <div className="project-details-header">
        <div>
          <Link
            to="/projects"
            className="back-link"
          >
            ← Back to projects
          </Link>

          <div className="project-title-row">
            <div>
              <span className="page-eyebrow">
                PROJECT
              </span>

              <h1>{project.name}</h1>
            </div>

            <span
              className={`status-badge status-${project.status?.toLowerCase()}`}
            >
              {project.status?.replaceAll(
                "_",
                " ",
              )}
            </span>
          </div>

          <p className="project-details-description">
            {project.description ||
              "No project description provided."}
          </p>
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setEditing(true)}
          >
            Edit project
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {editing ? (
        <form
          className="project-form project-edit-form"
          onSubmit={handleUpdate}
        >
          <div className="form-field">
            <label htmlFor="project-name">
              Project name
            </label>

            <input
              id="project-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="project-description">
              Description
            </label>

            <textarea
              id="project-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              rows={5}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="project-status">
                Status
              </label>

              <select
                id="project-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="PLANNING">
                  Planning
                </option>

                <option value="IN_PROGRESS">
                  In progress
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="ON_HOLD">
                  On hold
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="project-priority">
                Priority
              </label>

              <select
                id="project-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="URGENT">
                  Urgent
                </option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="project-start-date">
                Start date
              </label>

              <input
                id="project-start-date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="project-due-date">
                Due date
              </label>

              <input
                id="project-due-date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save changes"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="project-overview-grid">
            <div className="project-info-card">
              <span>Status</span>

              <strong>
                {project.status?.replaceAll(
                  "_",
                  " ",
                )}
              </strong>
            </div>

            <div className="project-info-card">
              <span>Priority</span>

              <strong>
                {project.priority}
              </strong>
            </div>

            <div className="project-info-card">
              <span>Members</span>

              <strong>
                {project.members?.length || 0}
              </strong>
            </div>

            <div className="project-info-card">
              <span>Tasks</span>

              <strong>{progress.total}</strong>
            </div>
          </div>

          <div className="project-content-grid">
            <div className="project-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">
                    PROGRESS
                  </span>

                  <h2>Project progress</h2>
                </div>

                <strong className="progress-value">
                  {progress.percentage}%
                </strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress.percentage}%`,
                  }}
                />
              </div>

              <div className="progress-meta">
                <span>
                  {progress.completed} of{" "}
                  {progress.total} tasks completed
                </span>

                <span>
                  {progress.total -
                    progress.completed}{" "}
                  remaining
                </span>
              </div>
            </div>

            <div className="project-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">
                    DETAILS
                  </span>

                  <h2>Project information</h2>
                </div>
              </div>

              <div className="project-detail-list">
                <div>
                  <span>Owner</span>

                  <strong>
                    {project.owner?.name ||
                      "Unknown"}
                  </strong>
                </div>

                <div>
                  <span>Start date</span>

                  <strong>
                    {project.startDate
                      ? new Date(
                          project.startDate,
                        ).toLocaleDateString()
                      : "Not set"}
                  </strong>
                </div>

                <div>
                  <span>Due date</span>

                  <strong>
                    {project.dueDate
                      ? new Date(
                          project.dueDate,
                        ).toLocaleDateString()
                      : "Not set"}
                  </strong>
                </div>

                <div>
                  <span>Created</span>

                  <strong>
                    {project.createdAt
                      ? new Date(
                          project.createdAt,
                        ).toLocaleDateString()
                      : "Unknown"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="project-panel project-task-summary">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  TASKS
                </span>

                <h2>Task summary</h2>
              </div>

              <Link
                to="/tasks"
                className="text-button"
              >
                View tasks →
              </Link>
            </div>

            <div className="task-summary-grid">
              <div>
                <span>To do</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status ===
                        "TODO",
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>In progress</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status ===
                        "IN_PROGRESS",
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Review</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status ===
                        "REVIEW",
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Completed</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status ===
                        "COMPLETED",
                    ).length
                  }
                </strong>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectDetails;