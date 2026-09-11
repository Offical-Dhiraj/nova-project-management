import {
  ArrowLeft,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getProjectPriorityLabel,
  getProjectStatusLabel,
} from "../../../constants/project";

const statusStyles = {
  PLANNING:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  IN_PROGRESS:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",

  COMPLETED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  ON_HOLD:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

const formatDate = (date) => {
  if (!date) return null;

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(date));
};

const ProjectHeader = ({
  project,
  onDelete,
}) => {
  const projectId =
    project._id || project.id;

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
      <div className="p-6 sm:p-7">
        <Link
          to="/projects"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-500
            hover:text-violet-600

            dark:text-slate-400
            dark:hover:text-violet-400
          "
        >
          <ArrowLeft size={15} />

          Back to projects
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-4">
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-violet-600
                text-white
                shadow-lg
                shadow-violet-600/20
              "
            >
              <span className="text-xl font-extrabold">
                {project.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "P"}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {project.name}
                </h1>

                <span
                  className={`
                    rounded-full
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    ${
                      statusStyles[
                        project.status
                      ] ||
                      statusStyles.PLANNING
                    }
                  `}
                >
                  {getProjectStatusLabel(
                    project.status,
                  )}
                </span>
              </div>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {project.description ||
                  "No project description provided."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Priority:{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {getProjectPriorityLabel(
                      project.priority,
                    )}
                  </span>
                </span>

                {project.dueDate && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <CalendarDays
                      size={14}
                    />

                    Due{" "}
                    {formatDate(
                      project.dueDate,
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Link
              to={`/projects/${projectId}/edit`}
              className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-4
                text-xs
                font-bold
                text-slate-700
                hover:bg-slate-50

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              <Pencil size={14} />

              Edit
            </Link>

            <button
              type="button"
              onClick={onDelete}
              className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-red-200
                px-4
                text-xs
                font-bold
                text-red-600
                hover:bg-red-50

                dark:border-red-900/50
                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              <Trash2 size={14} />

              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;