export const getErrorMessage = (
  error,
  fallback = "Something went wrong.",
) => {
  return (
    error?.normalizedMessage ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};

export const getValidationErrors = (
  error,
) => {
  return (
    error?.response?.data?.errors ||
    []
  );
};