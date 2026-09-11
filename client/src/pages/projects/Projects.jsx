import {
  FolderKanban,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import ProjectFilters from "../../features/projects/components/ProjectFilters";
import ProjectGrid from "../../features/projects/components/ProjectGrid";

import {
  getProjects,
} from "../../features/projects/project.service";

const Projects = () => {
  const [projects, setProjects] =
    useState([]);

  const [filters, setFilters] =
    useState({
      search: "",
      status: "",
      priority: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProjects =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");

          const result =
            await getProjects({
              page: 1,
              limit: 100,
              ...filters,
            });

          setProjects(
            result.projects,
          );
        } catch (err) {
          console.error(
            "Projects loading error:",
            err,
          );

          setError(
            err.response?.data
              ?.message ||
              "Unable to load projects.",
          );
        } finally {
          setLoading(false);
        }
      },
      [filters],
    );

  useEffect(() => {
    const timer = setTimeout(
      () => {
        loadProjects();
      },
      250,
    );

    return () =>
      clearTimeout(timer);
  }, [loadProjects]);

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
            Workspace
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Projects
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Organize your team's work
            and keep every project moving
            forward.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-violet-600/20
            transition
            hover:bg-violet-700
          "
        >
          <Plus size={17} />

          New project
        </Link>
      </div>

      {/* Filters */}

      <ProjectFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Content */}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="
                  h-80
                  animate-pulse
                  rounded-2xl
                  bg-slate-200

                  dark:bg-slate-800
                "
              />
            ),
          )}
        </div>
      ) : projects.length ? (
        <ProjectGrid
          projects={projects}
        />
      ) : (
        <div
          className="
            flex
            min-h-96
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            text-center

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-violet-50
              text-violet-600

              dark:bg-violet-500/10
              dark:text-violet-400
            "
          >
            <FolderKanban
              size={25}
            />
          </div>

          <h2 className="mt-5 text-base font-extrabold text-slate-900 dark:text-white">
            No projects found
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            {filters.search ||
            filters.status ||
            filters.priority
              ? "Try changing your filters to find another project."
              : "Create your first project and start organizing your team's work."}
          </p>

          {!(
            filters.search ||
            filters.status ||
            filters.priority
          ) && (
            <Link
              to="/projects/new"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-xs font-bold text-white hover:bg-violet-700"
            >
              <Plus size={15} />

              Create project
            </Link>
          )}

          {(
            filters.search ||
            filters.status ||
            filters.priority
          ) && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RefreshCw
                size={14}
              />

              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;