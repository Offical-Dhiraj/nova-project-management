import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  FolderKanban,
  MoreHorizontal,
  Users,
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

const priorityStyles = {
  LOW: "text-slate-500",
  MEDIUM: "text-blue-500",
  HIGH: "text-orange-500",
  URGENT: "text-red-500",
};

const formatDate = (date) => {
  if (!date) return "No due date";

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(date));
};

const getProgress = (project) => {
  const tasks =
    project?._dashboardTasks || [];

  if (!tasks.length) {
    return project.status === "COMPLETED"
      ? 100
      : 0;
  }

  const completed = tasks.filter(
    (task) =>
      task.status === "COMPLETED",
  ).length;

  return Math.round(
    (completed / tasks.length) * 100,
  );
};

const ProjectCard = ({
  project,
  onDelete,
}) => {
  const projectId =
    project._id || project.id;

  const progress =
    getProgress(project);

  const members =
    project.members || [];

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-violet-50
              text-violet-600

              dark:bg-violet-500/10
              dark:text-violet-400
            "
          >
            <FolderKanban
              size={21}
            />
          </div>

          <button
            type="button"
            aria-label="Project options"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <MoreHorizontal
              size={18}
            />
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/projects/${projectId}`}
              className="
                min-w-0
                text-base
                font-extrabold
                text-slate-900
                transition
                hover:text-violet-600

                dark:text-white
                dark:hover:text-violet-400
              "
            >
              <span className="line-clamp-1">
                {project.name}
              </span>
            </Link>

            <span
              className={`
                shrink-0
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-bold
                ${statusStyles[project.status] || statusStyles.PLANNING}
              `}
            >
              {getProjectStatusLabel(
                project.status,
              )}
            </span>
          </div>

          <p
            className="
              mt-2
              line-clamp-2
              min-h-10
              text-xs
              leading-5
              text-slate-500

              dark:text-slate-400
            "
          >
            {project.description ||
              "No project description provided."}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Progress
            </span>

            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
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

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users
                size={14}
                className="text-slate-400"
              />

              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {members.length}{" "}
                {members.length === 1
                  ? "member"
                  : "members"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarDays
                size={14}
                className="text-slate-400"
              />

              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {formatDate(
                  project.dueDate,
                )}
              </span>
            </div>
          </div>

          <span
            className={`
              flex
              items-center
              gap-1
              text-[10px]
              font-bold
              ${priorityStyles[project.priority] || priorityStyles.MEDIUM}
            `}
          >
            {project.priority ===
              "URGENT" && (
              <CircleAlert
                size={12}
              />
            )}

            {getProjectPriorityLabel(
              project.priority,
            )}
          </span>
        </div>
      </div>

      <Link
        to={`/projects/${projectId}`}
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          bg-slate-50
          px-5
          py-3
          text-xs
          font-bold
          text-slate-600
          transition
          hover:bg-violet-50
          hover:text-violet-700

          dark:border-slate-800
          dark:bg-slate-800/40
          dark:text-slate-300
          dark:hover:bg-violet-500/10
          dark:hover:text-violet-400
        "
      >
        View project

        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
};

export default ProjectCard;