

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../ui/ThemeToggle";

const Topbar = ({
  onMobileMenu,
}) => {
  const { user } = useAuth();

  const [open, setOpen] =
    useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((part) =>
        part.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-20 items-center
        justify-between
        border-b border-slate-200
        bg-white/90 px-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenu}
          className="
            flex h-10 w-10 items-center
            justify-center rounded-xl
            text-slate-500
            hover:bg-slate-100
            lg:hidden
            dark:hover:bg-slate-900
          "
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div
          className="
            hidden items-center gap-2
            rounded-xl border
            border-slate-200
            bg-slate-50 px-3
            sm:flex
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <Search
            size={16}
            className="text-slate-400"
          />

          <input
            type="search"
            placeholder="Search..."
            className="
              h-9 w-48
              border-0 bg-transparent
              text-sm outline-none
              placeholder:text-slate-400
              focus:ring-0
              lg:w-64
              dark:text-white
            "
          />

          <kbd
            className="
              hidden rounded-md
              border border-slate-200
              bg-white px-1.5
              py-0.5 text-[10px]
              text-slate-400
              lg:block
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            /
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />

        <button
          type="button"
          className="
            relative flex h-10 w-10
            items-center justify-center
            rounded-xl
            text-slate-500
            hover:bg-slate-100
            dark:hover:bg-slate-900
          "
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span
            className="
              absolute right-2.5 top-2.5
              h-2 w-2 rounded-full
              bg-violet-600
              ring-2 ring-white
              dark:ring-slate-950
            "
          />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpen((value) => !value)
            }
            className="
              flex items-center gap-2
              rounded-xl p-1.5
              hover:bg-slate-100
              dark:hover:bg-slate-900
            "
            aria-expanded={open}
          >
            <span
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-violet-100
                text-xs font-bold
                text-violet-700
                dark:bg-violet-500/15
                dark:text-violet-400
              "
            >
              {initials}
            </span>

            <span
              className="
                hidden text-left
                sm:block
              "
            >
              <span
                className="
                  block text-xs
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {user?.name}
              </span>

              <span
                className="
                  block text-[10px]
                  uppercase
                  text-slate-400
                "
              >
                {user?.role}
              </span>
            </span>

            <ChevronDown
              size={15}
              className="
                hidden text-slate-400
                sm:block
              "
            />
          </button>

          {open && (
            <div
              className="
                absolute right-0 top-12
                w-52 overflow-hidden
                rounded-xl border
                border-slate-200
                bg-white p-1.5
                shadow-xl
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div
                className="
                  border-b border-slate-100
                  px-3 py-2
                  dark:border-slate-800
                "
              >
                <p className="text-xs font-semibold dark:text-white">
                  {user?.name}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                  {user?.email}
                </p>
              </div>

              <button
                type="button"
                className="
                  mt-1 w-full rounded-lg
                  px-3 py-2 text-left
                  text-xs font-medium
                  text-slate-600
                  hover:bg-slate-50
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Profile
              </button>

              <button
                type="button"
                className="
                  w-full rounded-lg
                  px-3 py-2 text-left
                  text-xs font-medium
                  text-slate-600
                  hover:bg-slate-50
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;