import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

const AuthLayout = () => {
  return (
    <div
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-slate-50
        px-4 py-8
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* Background decoration */}

      <div
        className="
          pointer-events-none
          absolute -left-32 -top-32
          h-80 w-80 rounded-full
          bg-violet-200/40
          blur-3xl
          dark:bg-violet-900/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-32 -right-32
          h-80 w-80 rounded-full
          bg-blue-200/40
          blur-3xl
          dark:bg-blue-900/20
        "
      />

      {/* Theme */}

      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      {/* Auth content */}

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}

        <div className="mb-8 text-center">
          <div
            className="
              mx-auto mb-4 flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-violet-600
              text-lg font-extrabold
              text-white
              shadow-lg
              shadow-violet-500/25
            "
          >
            N
          </div>

          <h1
            className="
              text-2xl font-extrabold
              tracking-tight
              text-slate-950
              dark:text-white
            "
          >
            NOVA
          </h1>

          <p
            className="
              mt-1 text-xs font-medium
              uppercase tracking-[0.16em]
              text-slate-400
            "
          >
            Plan. Collaborate. Deliver.
          </p>
        </div>

        {/* Page */}

        <Outlet />

        {/* Footer */}

        <p
          className="
            mt-6 text-center
            text-xs text-slate-400
          "
        >
          © {new Date().getFullYear()} NOVA.
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;