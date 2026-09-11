import {
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Sparkles,
  Users,
} from "lucide-react";

const AuthBranding = () => {
  return (
    <section
      className="
        relative
        hidden
        min-h-screen
        overflow-hidden
        bg-slate-950
        lg:flex
        lg:w-[46%]
      "
    >
      {/* Background decoration */}

      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-violet-600/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-32
          h-96
          w-96
          rounded-full
          bg-indigo-500/20
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          w-full
          flex-col
          justify-between
          p-10
          xl:p-14
        "
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-600
              text-lg
              font-extrabold
              text-white
              shadow-lg
              shadow-violet-600/30
            "
          >
            N
          </div>

          <div>
            <p className="text-xl font-extrabold text-white">
              NOVA
            </p>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-slate-400
              "
            >
              Workspace
            </p>
          </div>
        </div>

        {/* Main content */}

        <div className="max-w-xl">
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3
              py-1.5
              text-xs
              font-semibold
              text-violet-300
            "
          >
            <Sparkles size={14} />

            Built for modern teams
          </div>

          <h1
            className="
              text-4xl
              font-extrabold
              leading-tight
              tracking-tight
              text-white
              xl:text-5xl
            "
          >
            Turn ideas into
            <span className="block text-violet-400">
              meaningful progress.
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-lg
              text-base
              leading-7
              text-slate-400
            "
          >
            Plan projects, coordinate
            your team, manage tasks and
            deliver great work — all from
            one focused workspace.
          </p>

          {/* Feature cards */}

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
              "
            >
              <Layers3
                size={20}
                className="text-violet-400"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Projects
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Stay organized
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
              "
            >
              <CheckCircle2
                size={20}
                className="text-emerald-400"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Tasks
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Keep moving
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
              "
            >
              <Users
                size={20}
                className="text-blue-400"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Teams
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Work together
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >
          <p className="text-xs text-slate-500">
            Plan. Collaborate. Deliver.
          </p>

          <ArrowUpRight
            size={17}
            className="text-slate-600"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthBranding;