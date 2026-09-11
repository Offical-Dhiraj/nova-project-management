import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";
import useAuth from "../../hooks/useAuth";

const Topbar = ({
  onMenuClick,
}) => {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/90
        px-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="
            rounded-xl
            p-2
            text-slate-600
            hover:bg-slate-100
            lg:hidden
            dark:text-slate-300
            dark:hover:bg-slate-900
          "
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={17}
            className="
              absolute left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            placeholder="Search projects, tasks..."
            className="
              h-10
              w-64
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              placeholder:text-slate-400

              focus:border-violet-500
              focus:bg-white
              focus:ring-4
              focus:ring-violet-500/10

              dark:border-slate-800
              dark:bg-slate-900
              dark:text-white
              dark:focus:bg-slate-950
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />

        <button
          type="button"
          className="
            relative
            rounded-xl
            p-2.5
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-900
            dark:hover:text-white
          "
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span
            className="
              absolute right-2 top-2
              h-1.5 w-1.5
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div
          className="
            hidden h-8
            w-px
            bg-slate-200
            sm:block
            dark:bg-slate-800
          "
        />

        {/* User */}
        <button
          type="button"
          className="
            flex items-center
            gap-2
            rounded-xl
            p-1.5
            transition
            hover:bg-slate-100
            dark:hover:bg-slate-900
          "
        >
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-violet-600
              text-xs
              font-bold
              text-white
            "
          >
            {initials}
          </div>

          <div className="hidden text-left md:block">
            <p
              className="
                max-w-32
                truncate
                text-xs
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {user?.name || "User"}
            </p>

            <p
              className="
                text-[10px]
                text-slate-400
              "
            >
              {user?.role || "MEMBER"}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;