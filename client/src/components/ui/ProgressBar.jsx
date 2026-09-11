const ProgressBar = ({
  value = 0,
  showLabel = false,
  size = "md",
}) => {
  const percentage = Math.min(
    Math.max(Number(value) || 0, 0),
    100,
  );

  const height =
    size === "sm"
      ? "h-1.5"
      : size === "lg"
        ? "h-3"
        : "h-2";

  return (
    <div className="w-full">
      <div
        className={`
          w-full
          overflow-hidden
          rounded-full
          bg-slate-100
          dark:bg-slate-800
          ${height}
        `}
      >
        <div
          className={`
            ${height}
            rounded-full
            bg-violet-600
            transition-all
            duration-500
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {showLabel && (
        <p
          className="
            mt-1
            text-right
            text-[11px]
            font-semibold
            text-slate-500
            dark:text-slate-400
          "
        >
          {percentage}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;