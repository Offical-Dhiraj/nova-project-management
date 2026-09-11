import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Plus,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import StatsCard from "../../features/dashboard/components/StatsCard";
import ProjectOverview from "../../features/dashboard/components/ProjectOverview";
import TaskOverview from "../../features/dashboard/components/TaskOverview";
import RecentActivity from "../../features/dashboard/components/RecentActivity";
import UpcomingTasks from "../../features/dashboard/components/UpcomingTasks";

import {
  getDashboardProjects,
  getProjectTasks,
} from "../../features/dashboard/dashboard.service";

import {
  getDashboardStats,
  getId,
  getUpcomingTasks,
} from "../../features/dashboard/dashboard.utils";

const Dashboard = () => {
  const {
    user,
  } = useAuth();

  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    tasks,
    setTasks,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const loadDashboard =
    async (
      showRefresh = false,
    ) => {
      try {
        setError("");

        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const {
          projects:
            projectList,
        } =
          await getDashboardProjects();

        const projectTasks =
          await Promise.all(
            projectList.map(
              async (project) => {
                const projectId =
                  getId(project);

                if (!projectId) {
                  return [];
                }

                try {
                  const {
                    tasks:
                      taskList,
                  } =
                    await getProjectTasks(
                      projectId,
                    );

                  return taskList.map(
                    (task) => ({
                      ...task,
                      project:
                        task.project ||
                        project,
                    }),
                  );
                } catch {
                  return [];
                }
              },
            ),
          );

        const allTasks =
          projectTasks.flat();

        const projectsWithTasks =
          projectList.map(
            (project) => {
              const projectId =
                getId(project);

              return {
                ...project,
                _dashboardTasks:
                  allTasks.filter(
                    (task) =>
                      getId(
                        task.project,
                      ) === projectId,
                  ),
              };
            },
          );

        setProjects(
          projectsWithTasks,
        );

        setTasks(allTasks);
      } catch (err) {
        console.error(
          "Dashboard loading error:",
          err,
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to load dashboard data.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = useMemo(
    () =>
      getDashboardStats(
        projects,
        tasks,
      ),
    [projects, tasks],
  );

  const upcomingTasks =
    useMemo(
      () =>
        getUpcomingTasks(
          tasks,
          5,
        ),
      [tasks],
    );

  const firstName =
    user?.name
      ?.trim()
      ?.split(" ")[0] ||
    "there";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-80 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            1, 2, 3, 4,
          ].map((item) => (
            <div
              key={item}
              className="
                h-32
                animate-pulse
                rounded-2xl
                bg-slate-200
                dark:bg-slate-800
              "
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Header */}

      <section
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-violet-600

              dark:text-violet-400
            "
          >
            Workspace overview
          </p>

          <h1
            className="
              mt-1
              text-2xl
              font-extrabold
              tracking-tight
              text-slate-950

              sm:text-3xl
              dark:text-white
            "
          >
            Good to see you,{" "}
            {firstName} 👋
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500

              dark:text-slate-400
            "
          >
            Here's what's happening
            across your projects and
            tasks today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              loadDashboard(true)
            }
            disabled={refreshing}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

          <Link
            to="/projects/new"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-violet-600
              px-4
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-violet-600/20
              transition
              hover:bg-violet-700
              hover:shadow-violet-600/30
            "
          >
            <Plus size={17} />

            <span>
              New project
            </span>
          </Link>
        </div>
      </section>

      {/* Error */}

      {error && (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700

            dark:border-red-900/50
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <AlertTriangle
            size={18}
          />

          <span>{error}</span>
        </div>
      )}

      {/* KPI */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total projects"
          value={
            stats.totalProjects
          }
          description="in your workspace"
          icon={FolderKanban}
        />

        <StatsCard
          title="Active projects"
          value={
            stats.activeProjects
          }
          description="currently in progress"
          icon={RefreshCw}
          iconClassName="
            bg-blue-50
            text-blue-600
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        />

        <StatsCard
          title="Open tasks"
          value={
            stats.totalTasks -
            stats.completedTasks
          }
          description="need attention"
          icon={ListTodo}
          iconClassName="
            bg-amber-50
            text-amber-600
            dark:bg-amber-500/10
            dark:text-amber-400
          "
        />

        <StatsCard
          title="Completed tasks"
          value={
            stats.completedTasks
          }
          description="successfully finished"
          icon={CheckCircle2}
          iconClassName="
            bg-emerald-50
            text-emerald-600
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        />
      </section>

      {/* Main overview */}

      <section
        className="
          grid
          gap-6
          xl:grid-cols-[1.45fr_0.95fr]
        "
      >
        <ProjectOverview
          projects={projects}
        />

        <TaskOverview
          stats={stats}
        />
      </section>

      {/* Bottom */}

      <section
        className="
          grid
          gap-6
          xl:grid-cols-[1.45fr_0.95fr]
        "
      >
        <UpcomingTasks
          tasks={upcomingTasks}
        />

        <RecentActivity
          projects={projects}
          tasks={tasks}
        />
      </section>
    </div>
  );
};

export default Dashboard;