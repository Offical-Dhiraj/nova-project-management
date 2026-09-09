import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "My Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
];

const Sidebar = ({ onNavigate }) => {
  return (
    <aside
      className="
        flex h-full min-h-screen
        w-64 flex-col
        border-r border-slate-200
        bg-white
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* Logo */}

      <div
        className="
          flex h-20 items-center
          justify-between
          border-b border-slate-200
          px-5
          dark:border-slate-800
        "
      >
        <NavLink
          to="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <span
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-violet-600
              text-sm font-extrabold
              text-white
              shadow-lg
              shadow-violet-500/20
            "
          >
            N
          </span>

          <div>
            <span
              className="
                block text-lg font-extrabold
                tracking-tight
                text-slate-950
                dark:text-white
              "
            >
              NOVA
            </span>

            <span
              className="
                block text-[9px]
                font-semibold uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Workspace
            </span>
          </div>
        </NavLink>

        {/* Mobile close */}

        <button
          type="button"
          onClick={onNavigate}
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-slate-400
            hover:bg-slate-100
            lg:hidden
            dark:hover:bg-slate-900
          "
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-6">
        <p
          className="
            mb-3 px-3
            text-[10px] font-bold
            uppercase tracking-[0.15em]
            text-slate-400
          "
        >
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map(
            ({
              label,
              path,
              icon: Icon,
            }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-sm font-medium
                    transition-all

                    ${
                      isActive
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }
                  `
                }
              >
                <Icon size={18} />

                <span>{label}</span>
              </NavLink>
            ),
          )}
        </div>

        <p
          className="
            mb-3 mt-8 px-3
            text-[10px] font-bold
            uppercase tracking-[0.15em]
            text-slate-400
          "
        >
          Personal
        </p>

        <NavLink
          to="/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            `
              flex items-center gap-3
              rounded-xl px-3 py-2.5
              text-sm font-medium
              transition-all

              ${
                isActive
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
              }
            `
          }
        >
          <Settings size={18} />

          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Footer */}

      <div
        className="
          border-t border-slate-200
          p-4
          dark:border-slate-800
        "
      >
        <p
          className="
            px-2 text-[11px]
            leading-5 text-slate-400
          "
        >
          Plan. Collaborate. Deliver.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;