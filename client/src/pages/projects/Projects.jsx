import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from "../../services/project.service";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects({
        page: 1,
        limit: 100,
      });

      setProjects(response.data.projects || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load projects.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="page-state">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-state error-state">
        {error}
      </div>
    );
  }

  return (
    <section className="projects-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">WORKSPACE</span>

          <h1>Projects</h1>

          <p>
            Manage your team's projects and track progress.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
           onClick={() => navigate("/projects/new")}
        >
          + New project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">+</div>

          <h2>No projects yet</h2>

          <p>
            Create your first project and start organizing
            your team's work.
          </p>

          <button className="primary-button" type="button">
            Create project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card"
            >
              <div className="project-card-top">
                <span
                  className={`status-badge status-${project.status?.toLowerCase()}`}
                >
                  {project.status?.replaceAll("_", " ")}
                </span>

                <span className="project-priority">
                  {project.priority}
                </span>
              </div>

              <h2>{project.name}</h2>

              <p>
                {project.description ||
                  "No project description provided."}
              </p>

              <div className="project-card-footer">
                <span>
                  {project.members?.length || 0} members
                </span>

                <span>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;