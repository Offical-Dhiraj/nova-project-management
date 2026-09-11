import {
  ArrowRight,
  FolderKanban,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getProjectProgress,
  formatProjectStatus,
} from "../dashboard.utils";

const statusStyles = {
  PLANNING:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",

  IN_PROGRESS:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",

  COMPLETED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  ON_HOLD:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

const ProjectOverview = ({
  projects,
}) => {
  const visibleProjects =
    projects.slice(0, 5);

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-5
          py-4

          dark:border-slate-800
        "
      >
        <div>
          <h2
            className="
              text-base
              font-bold
              text-slate-950
              dark:text-white
            "
          >
            Project overview
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Your most recent projects
          </p>
        </div>

        <Link
          to="/projects"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-bold
            text-violet-600
            hover:text-violet-700
            dark:text-violet-400
          "
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      {visibleProjects.length === 0 ? (
        <div
          className="
            flex
            min-h-56
            flex-col
            items-center
            justify-center
            px-5
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-violet-50
              text-violet-600
              dark:bg-violet-500/10
              dark:text-violet-400
            "
          >
            <FolderKanban size={22} />
          </div>

          <h3
            className="
              mt-4
              text-sm
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            No projects yet
          </h3>

          <p
            className="
              mt-1
              max-w-xs
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Create your first project
            to start managing your
            team's work.
          </p>

          <Link
            to="/projects/new"
            className="
              mt-4
              rounded-lg
              bg-violet-600
              px-4
              py-2
              text-xs
              font-bold
              text-white
              transition
              hover:bg-violet-700
            "
          >
            Create project
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {visibleProjects.map(
            (project) => {
              const progress =
                getProjectProgress(
                  project,
                );

              return (
                <Link
                  key={
                    project._id ||
                    project.id
                  }
                  to={`/projects/${
                    project._id ||
                    project.id
                  }`}
                  className="
                    block
                    px-5
                    py-4
                    transition
                    hover:bg-slate-50

                    dark:hover:bg-slate-800/50
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {project.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {project.description ||
                          "No description"}
                      </p>
                    </div>

                    <span
                      className={`
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        ${statusStyles[
                          project.status
                        ] || statusStyles.PLANNING}
                      `}
                    >
                      {formatProjectStatus(
                        project.status,
                      )}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-[11px] font-medium text-slate-400">
                        Progress
                      </span>

                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        {progress}%
                      </span>
                    </div>

                    <div
                      className="
                        h-1.5
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                        dark:bg-slate-800
                      "
                    >
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-violet-600
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectOverview;