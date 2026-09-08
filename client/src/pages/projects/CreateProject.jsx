import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProject,
} from "../../services/project.service";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        startDate: formData.startDate || null,
        dueDate: formData.dueDate || null,
      };

      const response = await createProject(payload);

      navigate(`/projects/${response.data.id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create project.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">PROJECTS</span>

          <h1>Create project</h1>

          <p>
            Set up a new project for your team.
          </p>
        </div>
      </div>

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <label htmlFor="name">Project name</label>

          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. NOVA Website"
            minLength={2}
            maxLength={100}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the project..."
            maxLength={1000}
            rows={5}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="status">Status</label>

            <select
              id="status"
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
            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="startDate">
              Start date
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="dueDate">
              Due date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create project"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateProject;