import {
  Link,
  Outlet,
} from "react-router-dom";

import ThemeToggle from "../components/ui/ThemeToggle";
import AuthBranding from "../features/auth/components/AuthBranding";

const AuthLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        dark:bg-slate-950
      "
    >
      <div className="flex min-h-screen">
        <AuthBranding />

        <main
          className="
            flex
            min-h-screen
            w-full
            flex-1
            flex-col
          "
        >
          {/* Header */}

          <header
            className="
              flex
              items-center
              justify-between
              px-5
              py-5
              sm:px-8
              lg:px-10
            "
          >
            <Link
              to="/"
              className="
                flex
                items-center
                gap-2
                lg:hidden
              "
            >
              <span
                className="
                  flex h-9 w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-600
                  text-sm
                  font-extrabold
                  text-white
                "
              >
                N
              </span>

              <span className="font-extrabold">
                NOVA
              </span>
            </Link>

            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>

          {/* Page */}

          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              px-5
              pb-10
              sm:px-8
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;