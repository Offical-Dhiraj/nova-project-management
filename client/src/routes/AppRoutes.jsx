import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import AppLayout from "../components/layout/AppLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Projects from "../pages/projects/Projects";
import CreateProject from "../pages/projects/CreateProject";
import ProjectDetails from "../pages/projects/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/new"
            element={<CreateProject />}
          />

          <Route
            path="/projects/:projectId"
            element={<ProjectDetails />}
          />
        </Route>
      </Route>

      {/* Root */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* Unknown route */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;