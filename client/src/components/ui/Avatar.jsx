import { getInitials } from "../../utils/formatName";

const sizes = {
  xs: "h-6 w-6 text-[9px]",
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-12 w-12 text-sm",
  xl: "h-16 w-16 text-lg",
};

const Avatar = ({
  src,
  name = "User",
  size = "md",
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-violet-100
        font-bold
        text-violet-700
        ring-1
        ring-violet-200

        dark:bg-violet-500/10
        dark:text-violet-400
        dark:ring-violet-500/20

        ${sizes[size]}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="
            h-full
            w-full
            object-cover
          "
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export default Avatar;