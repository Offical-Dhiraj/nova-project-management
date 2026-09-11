import {
  BarChart3,
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
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "My Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Team",
    path: "/team",
    icon: Users,
  },
];

const Sidebar = ({
  mobileOpen = false,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-slate-950/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          dark:border-slate-800
          dark:bg-slate-950

          lg:static
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Brand */}
        <div
          className="
            flex h-20
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            dark:border-slate-800
          "
        >
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-violet-600
                text-lg font-extrabold
                text-white
                shadow-lg
                shadow-violet-600/20
              "
            >
              N
            </div>

            <div>
              <p
                className="
                  text-lg font-extrabold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                NOVA
              </p>

              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                Workspace
              </p>
            </div>
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg p-2
              text-slate-500
              hover:bg-slate-100
              lg:hidden
              dark:hover:bg-slate-800
            "
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p
            className="
              px-3 pb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map(
              ({
                name,
                path,
                icon: Icon,
              }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                      group flex items-center
                      gap-3 rounded-xl
                      px-3 py-2.5
                      text-sm font-medium
                      transition-all

                      ${
                        isActive
                          ? `
                            bg-violet-50
                            text-violet-700
                            dark:bg-violet-500/10
                            dark:text-violet-400
                          `
                          : `
                            text-slate-600
                            hover:bg-slate-100
                            hover:text-slate-900
                            dark:text-slate-400
                            dark:hover:bg-slate-900
                            dark:hover:text-white
                          `
                      }
                    `
                  }
                >
                  <Icon size={18} />

                  <span>{name}</span>
                </NavLink>
              ),
            )}
          </div>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <p
            className="
              px-3 pb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Account
          </p>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
                flex items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm font-medium
                transition-all

                ${
                  isActive
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                }
              `
            }
          >
            <Settings size={18} />

            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Bottom Workspace Card */}
        <div className="p-3">
          <div
            className="
              rounded-2xl
              border border-slate-200
              bg-slate-50
              p-4
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  bg-violet-100
                  text-xs font-bold
                  text-violet-700
                  dark:bg-violet-500/10
                  dark:text-violet-400
                "
              >
                N
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-xs font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  NOVA Workspace
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-400
                  "
                >
                  Team productivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;