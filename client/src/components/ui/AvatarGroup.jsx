import Avatar from "./Avatar";

const AvatarGroup = ({
  users = [],
  max = 4,
}) => {
  const visibleUsers =
    users.slice(0, max);

  const remaining =
    Math.max(
      users.length - max,
      0,
    );

  return (
    <div className="flex items-center">
      {visibleUsers.map(
        (user, index) => (
          <div
            key={
              user._id ||
              user.id ||
              index
            }
            className={`
              ${
                index > 0
                  ? "-ml-2"
                  : ""
              }
              rounded-full
              ring-2
              ring-white
              dark:ring-slate-900
            `}
          >
            <Avatar
              src={user.avatar}
              name={user.name}
              size="sm"
            />
          </div>
        ),
      )}

      {remaining > 0 && (
        <div
          className="
            -ml-2
            flex h-8 w-8
            items-center
            justify-center
            rounded-full
            bg-slate-100
            text-[10px]
            font-bold
            text-slate-600
            ring-2
            ring-white
            dark:bg-slate-800
            dark:text-slate-300
            dark:ring-slate-900
          "
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;