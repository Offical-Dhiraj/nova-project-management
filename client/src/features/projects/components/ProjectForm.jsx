import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  Loader2,
  Save,
} from "lucide-react";

import {
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
} from "../../../constants/project";

const ProjectForm = ({
  values,
  errors,
  loading,
  submitLabel = "Create project",
  onChange,
  onSubmit,
  onCancel,
}) => {
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    onChange({
      ...values,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
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
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
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
              size={19}
            />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-950 dark:text-white">
              Project information
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Set up the details for
              your project.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Project name
          </label>

          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g. Website redesign"
            maxLength={100}
            className={`
              h-12
              w-full
              rounded-xl
              border
              bg-slate-50
              px-4
              text-sm
              font-medium
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:bg-white
              focus:ring-4

              dark:bg-slate-800
              dark:text-white
              dark:focus:bg-slate-800

              ${
                errors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10 dark:border-slate-700"
              }
            `}
          />

          {errors.name && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="What is this project about?"
            maxLength={1000}
            rows={5}
            className={`
              w-full
              resize-none
              rounded-xl
              border
              bg-slate-50
              px-4
              py-3
              text-sm
              font-medium
              leading-6
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:bg-white
              focus:ring-4

              dark:bg-slate-800
              dark:text-white
              dark:focus:bg-slate-800

              ${
                errors.description
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10 dark:border-slate-700"
              }
            `}
          />

          <div className="mt-1 flex justify-between">
            <p className="text-xs text-red-500">
              {errors.description}
            </p>

            <span className="text-[10px] text-slate-400">
              {values.description
                .length}
              /1000
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
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
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
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
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Start date
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={
                  values.startDate
                }
                onChange={handleChange}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  focus:border-violet-500
                  focus:ring-4
                  focus:ring-violet-500/10

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Due date
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={
                  values.dueDate
                }
                onChange={handleChange}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  focus:border-violet-500
                  focus:ring-4
                  focus:ring-violet-500/10

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                "
              />
            </div>

            {errors.dueDate && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-200
          bg-slate-50
          p-5
          sm:flex-row
          sm:justify-end

          dark:border-slate-800
          dark:bg-slate-800/40
        "
      >
        <button
          type="button"
          onClick={onCancel}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            text-sm
            font-bold
            text-slate-600
            transition
            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <ArrowLeft size={16} />

          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Save size={17} />
          )}

          {loading
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;