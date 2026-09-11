const normalizeSearch = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value).trim();
};

export const validateUserQuery = (query) => {
  const errors = [];

  const search = normalizeSearch(query.search);

  if (search && search.length > 100) {
    errors.push({
      field: "search",
      message: "Search cannot exceed 100 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      search,
    },
  };
};