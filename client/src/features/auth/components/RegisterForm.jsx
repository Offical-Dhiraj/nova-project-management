import {
  useState,
} from "react";

import {
  Check,
  Eye,
  EyeOff,
  UserRound,
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
  registerSchema,
} from "../auth.validation";

import {
  getErrorMessage,
} from "../../../utils/errorHandler";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register: registerUser,
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
      zodResolver(
        registerSchema,
      ),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values,
  ) => {
    setServerError("");

    try {
      await registerUser({
        name: values.name.trim(),

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
          "Unable to create your account.",
        ),
      );
    }
  };

  return (
    <div className="w-full max-w-md">
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
          Create your account
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
          Start organizing your work
          with NOVA.
        </p>
      </div>

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
          id="name"
          label="Full name"
          placeholder="Dhiraj Kumar"
          autoComplete="name"
          required
          error={
            errors.name?.message
          }
          {...register("name")}
        />

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
            placeholder="At least 6 characters"
            autoComplete="new-password"
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

        <div
          className="
            rounded-xl
            bg-slate-50
            p-4
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-xs
              font-bold
              text-slate-700
              dark:text-slate-300
            "
          >
            Your account includes:
          </p>

          <div className="mt-3 space-y-2">
            {[
              "Personal workspace",
              "Project management",
              "Team collaboration",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                <Check
                  size={13}
                  className="text-emerald-500"
                />

                {item}
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full"
          size="lg"
        >
          Create account
        </Button>
      </form>

      <p
        className="
          mt-7
          text-center
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        Already have an account?

        <Link
          to="/login"
          className="
            ml-1
            font-bold
            text-violet-600
            hover:text-violet-700
            dark:text-violet-400
          "
        >
          Sign in
        </Link>
      </p>

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          text-[11px]
          text-slate-400
        "
      >
        <UserRound size={13} />

        Create your workspace account
      </div>
    </div>
  );
};

export default RegisterForm;