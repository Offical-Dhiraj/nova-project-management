const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (data) => {
  const errors = [];

  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  if (!name) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  } else if (name.length < 2) {
    errors.push({
      field: "name",
      message: "Name must be at least 2 characters",
    });
  } else if (name.length > 50) {
    errors.push({
      field: "name",
      message: "Name cannot exceed 50 characters",
    });
  }

  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address",
    });
  }

  if (!password) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  } else if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name,
      email,
      password,
    },
  };
};

export const validateLogin = (data) => {
  const errors = [];

  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address",
    });
  }

  if (!password) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      email,
      password,
    },
  };
};