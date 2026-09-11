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

import Tasks from "../pages/tasks/Tasks";
import Team from "../pages/team/Team";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

import NotFound from "../pages/errors/NotFound";
import Forbidden from "../pages/errors/Forbidden";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}

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

      {/* Protected routes */}

      <Route
        element={<ProtectedRoute />}
      >
        <Route
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* PROJECTS */}

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/new"
            element={
              <CreateProject />
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProjectDetails />
            }
          />

          {/* These will be completed later */}

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/team"
            element={<Team />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Route>

      <Route
        path="/403"
        element={<Forbidden />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;