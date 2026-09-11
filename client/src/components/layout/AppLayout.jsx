import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex-1 overflow-x-hidden">
            <div
              className="
                mx-auto
                w-full
                max-w-[1600px]
                p-4
                sm:p-6
                lg:p-8
              "
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;