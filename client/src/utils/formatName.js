export const getInitials = (
  name = "",
) => {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
};

export const getFirstName = (
  name = "",
) => {
  return (
    name.trim().split(/\s+/)[0] ||
    "there"
  );
};