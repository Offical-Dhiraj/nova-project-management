import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProjectHeader from "../../features/projects/components/ProjectHeader";

import ProjectStats from "../../features/projects/components/ProjectStats";

import ProjectProgress from "../../features/projects/components/ProjectProgress";

import {
  getProjectById,
  getProjectMembers,
  deleteProject,
} from "../../features/projects/project.service";

import {
  getProjectTasks,
} from "../../features/dashboard/dashboard.service";

const ProjectDetails = () => {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    project,
    setProject,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {
    const loadProject =
      async () => {
        try {
          setLoading(true);
          setError("");

          const [
            projectData,
            members,
            taskResult,
          ] =
            await Promise.all([
              getProjectById(id),
              getProjectMembers(id),
              getProjectTasks(id),
            ]);

          setProject({
            ...projectData,
            members:
              members ||
              projectData.members ||
              [],
            _dashboardTasks:
              taskResult.tasks ||
              [],
          });
        } catch (err) {
          console.error(
            "Project details error:",
            err,
          );

          setError(
            err.response?.data
              ?.message ||
              "Unable to load project.",
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      loadProject();
    }
  }, [id]);

  const handleDelete =
    async () => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this project? This action cannot be undone.",
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeleting(true);

        await deleteProject(id);

        navigate("/projects");
      } catch (err) {
        console.error(
          "Delete project error:",
          err,
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to delete project.",
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={28}
            className="animate-spin text-violet-600"
          />

          <p className="text-sm font-semibold text-slate-500">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-500/10">
          <AlertTriangle
            size={28}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-base font-extrabold text-red-700 dark:text-red-400">
            Unable to open project
          </h2>

          <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80">
            {error ||
              "Project could not be found."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/projects")
            }
            className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-700"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <ProjectHeader
        project={project}
        onDelete={handleDelete}
      />

      {deleting && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-400">
          <Loader2
            size={16}
            className="animate-spin"
          />

          Deleting project...
        </div>
      )}

      <ProjectStats
        project={project}
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ProjectProgress
          project={project}
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-extrabold text-slate-950 dark:text-white">
            Project details
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                {project.status}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Priority
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                {project.priority}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Members
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                {project.members?.length ||
                  0}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Task management comes in Section 5 */}
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Project tasks
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Full task board and task
          management will be added
          in Section 5.
        </p>
      </section>
    </div>
  );
};

export default ProjectDetails;