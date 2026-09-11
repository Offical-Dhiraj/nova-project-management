import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../features/auth/auth.service";

export const AuthContext =
  createContext(null);

const extractUser = (data) => {
  return (
    data?.user ||
    data?.data?.user ||
    data?.data ||
    null
  );
};

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const refreshUser =
    useCallback(async () => {
      try {
        setError(null);

        const response =
          await getCurrentUser();

        const currentUser =
          extractUser(response);

        setUser(currentUser);

        return currentUser;
      } catch {
        setUser(null);
        return null;
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (
    credentials,
  ) => {
    setError(null);

    try {
      const response =
        await loginUser(
          credentials,
        );

      const loggedInUser =
        extractUser(response);

      setUser(loggedInUser);

      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to sign in. Please check your credentials.";

      setError(message);

      throw err;
    }
  };

  const register = async (
    userData,
  ) => {
    setError(null);

    try {
      const response =
        await registerUser(userData);

      const registeredUser =
        extractUser(response);

      setUser(registeredUser);

      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to create your account.";

      setError(message);

      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated:
        Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [
      user,
      loading,
      error,
      refreshUser,
    ],
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};