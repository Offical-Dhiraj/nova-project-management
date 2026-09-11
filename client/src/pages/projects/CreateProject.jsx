import {
  ArrowLeft,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ProjectForm from "../../features/projects/components/ProjectForm";

import {
  createProject,
} from "../../features/projects/project.service";

import {
  validateProject,
} from "../../features/projects/project.validation";

const initialValues = {
  name: "",
  description: "",
  status: "PLANNING",
  priority: "MEDIUM",
  startDate: "",
  dueDate: "",
};

const CreateProject = () => {
  const navigate =
    useNavigate();

  const [
    values,
    setValues,
  ] = useState(initialValues);

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    serverError,
    setServerError,
  ] = useState("");

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const validationErrors =
        validateProject(values);

      setErrors(
        validationErrors,
      );

      if (
        Object.keys(
          validationErrors,
        ).length
      ) {
        return;
      }

      try {
        setLoading(true);
        setServerError("");

        const payload = {
          name: values.name.trim(),
          description:
            values.description.trim(),
          status: values.status,
          priority: values.priority,
          startDate:
            values.startDate ||
            null,
          dueDate:
            values.dueDate ||
            null,
        };

        const project =
          await createProject(
            payload,
          );

        const projectId =
          project?._id ||
          project?.id;

        if (projectId) {
          navigate(
            `/projects/${projectId}`,
          );
        } else {
          navigate("/projects");
        }
      } catch (err) {
        console.error(
          "Create project error:",
          err,
        );

        setServerError(
          err.response?.data
            ?.message ||
            "Unable to create project.",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <Link
          to="/projects"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-500
            transition
            hover:text-violet-600

            dark:text-slate-400
            dark:hover:text-violet-400
          "
        >
          <ArrowLeft size={15} />

          Back to projects
        </Link>

        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Create a new project
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Give your project a clear
          identity and define its
          timeline.
        </p>
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
          {serverError}
        </div>
      )}

      <ProjectForm
        values={values}
        errors={errors}
        loading={loading}
        onChange={setValues}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate("/projects")
        }
      />
    </div>
  );
};

export default CreateProject;