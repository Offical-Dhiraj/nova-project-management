import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  SearchX,
} from "lucide-react";

import Button from "../ui/Button";

const NotFound = () => {
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
            bg-violet-50
            text-violet-600

            dark:bg-violet-500/10
            dark:text-violet-400
          "
        >
          <SearchX size={28} />
        </div>

        <p
          className="
            mt-6
            text-6xl
            font-extrabold
            tracking-tight
          "
        >
          404
        </p>

        <h1
          className="
            mt-3
            text-xl
            font-bold
          "
        >
          Page not found
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
          The page you're looking for
          doesn't exist or may have
          been moved.
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

export default NotFound;