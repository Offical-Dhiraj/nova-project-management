import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  ShieldX,
} from "lucide-react";

import Button from "../ui/Button";

const Unauthorized = () => {
  return (
    <div
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-slate-50
        p-6
        dark:bg-slate-950
      "
    >
      <div className="max-w-md text-center">
        <div
          className="
            mx-auto
            flex h-16 w-16
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-600

            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <ShieldX size={28} />
        </div>

        <p
          className="
            mt-6
            text-6xl
            font-extrabold
          "
        >
          403
        </p>

        <h1
          className="
            mt-3
            text-xl
            font-bold
          "
        >
          Access denied
        </h1>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-500
            dark:text-slate-400
          "
        >
          You don't have permission to
          access this page.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block"
        >
          <Button>
            <ArrowLeft size={16} />
            Back to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;