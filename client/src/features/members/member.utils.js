export const getInitials = (
  name = "",
) => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "U";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`
    .toUpperCase();
};

export const getMemberDisplayName = (
  member,
) => {
  return (
    member?.name ||
    member?.email ||
    "Unknown user"
  );
};

export const getMemberRoleLabel = (
  role,
) => {
  const roles = {
    ADMIN: "Administrator",
    MANAGER: "Manager",
    MEMBER: "Member",
  };

  return (
    roles[role] ||
    "Member"
  );
};

export const getMemberRoleClass = (
  role,
) => {
  const styles = {
    ADMIN:
      "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",

    MANAGER:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    MEMBER:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    styles[role] ||
    styles.MEMBER
  );
};

export const isProjectOwner = (
  member,
  project,
) => {
  const ownerId =
    project?.owner?._id ||
    project?.owner?.id ||
    project?.owner;

  const memberId =
    member?._id ||
    member?.id;

  return (
    String(ownerId) ===
    String(memberId)
  );
};

export const sortMembersByName = (
  members = [],
) => {
  return [...members].sort(
    (a, b) =>
      getMemberDisplayName(a)
        .toLowerCase()
        .localeCompare(
          getMemberDisplayName(b)
            .toLowerCase(),
        ),
  );
};

export const filterMembers = (
  members = [],
  search = "",
) => {
  const query =
    search.trim().toLowerCase();

  if (!query) {
    return members;
  }

  return members.filter(
    (member) => {
      const name =
        member?.name?.toLowerCase() ||
        "";

      const email =
        member?.email?.toLowerCase() ||
        "";

      return (
        name.includes(query) ||
        email.includes(query)
      );
    },
  );
};