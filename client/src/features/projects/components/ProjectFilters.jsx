import {
  Filter,
  Search,
  X,
} from "lucide-react";

import {
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
} from "../../../constants/project";

const ProjectFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  const hasFilters =
    filters.search ||
    filters.status ||
    filters.priority;

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              onChange({
                ...filters,
                search:
                  event.target.value,
              })
            }
            placeholder="Search projects..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-10
              pr-4
              text-sm
              font-medium
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-violet-500
              focus:bg-white
              focus:ring-4
              focus:ring-violet-500/10

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:focus:bg-slate-800
            "
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status:
                  event.target.value,
              })
            }
            className="
              h-11
              min-w-40
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              text-sm
              font-semibold
              text-slate-700
              outline-none
              focus:border-violet-500
              focus:ring-4
              focus:ring-violet-500/10

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
            "
          >
            <option value="">
              All statuses
            </option>

            {PROJECT_STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>

          <select
            value={filters.priority}
            onChange={(event) =>
              onChange({
                ...filters,
                priority:
                  event.target.value,
              })
            }
            className="
              h-11
              min-w-40
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              text-sm
              font-semibold
              text-slate-700
              outline-none
              focus:border-violet-500
              focus:ring-4
              focus:ring-violet-500/10

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
            "
          >
            <option value="">
              All priorities
            </option>

            {PROJECT_PRIORITY_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-4
                text-sm
                font-bold
                text-slate-600
                transition
                hover:bg-slate-100

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              <X size={15} />

              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
        <Filter size={13} />

        <span>
          Filter projects by status,
          priority or search.
        </span>
      </div>
    </div>
  );
};

export default ProjectFilters;