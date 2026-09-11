import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import useAuth from "../../../hooks/useAuth";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
  loginSchema,
} from "../auth.validation";

import {
  getErrorMessage,
} from "../../../utils/errorHandler";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    login,
  } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver:
      zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values,
  ) => {
    setServerError("");

    try {
      await login({
        email:
          values.email
            .trim()
            .toLowerCase(),

        password:
          values.password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "Invalid email or password.",
        ),
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Heading */}

      <div className="mb-8">
        <div
          className="
            mb-5
            flex h-12 w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-600
            text-lg
            font-extrabold
            text-white
            shadow-lg
            shadow-violet-600/20
          "
        >
          N
        </div>

        <h1
          className="
            text-3xl
            font-extrabold
            tracking-tight
            text-slate-950
            dark:text-white
          "
        >
          Welcome back
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
          Sign in to continue to your
          NOVA workspace.
        </p>
      </div>

      {/* Server error */}

      {serverError && (
        <div
          className="
            mb-5
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            font-medium
            text-red-700

            dark:border-red-900/50
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(
          onSubmit,
        )}
        className="space-y-5"
      >
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={
            errors.email?.message
          }
          {...register("email")}
        />

        <div className="relative">
          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            error={
              errors.password?.message
            }
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (value) => !value,
              )
            }
            className="
              absolute
              right-3
              top-[34px]
              rounded-lg
              p-1.5
              text-slate-400
              hover:text-slate-700
              dark:hover:text-white
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="
              text-xs
              font-semibold
              text-violet-600
              hover:text-violet-700
              dark:text-violet-400
            "
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full"
          size="lg"
        >
          Sign in
        </Button>
      </form>

      {/* Register */}

      <p
        className="
          mt-7
          text-center
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        Don't have an account?

        <Link
          to="/register"
          className="
            ml-1
            font-bold
            text-violet-600
            hover:text-violet-700
            dark:text-violet-400
          "
        >
          Create one
        </Link>
      </p>

      <div
        className="
          mt-8
          flex
          items-center
          justify-center
          gap-2
          text-[11px]
          text-slate-400
        "
      >
        <LockKeyhole size={13} />

        Your session is securely protected.
      </div>
    </div>
  );
};

export default LoginForm;