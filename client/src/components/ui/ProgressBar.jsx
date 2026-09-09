const ProgressBar = ({
  value = 0,
  size = "md",
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, value),
  );

  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-2.5",
  };

  return (
    <div
      className={`
        w-full overflow-hidden
        rounded-full
        bg-slate-100
        dark:bg-slate-800
        ${heights[size]}
      `}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className="
          h-full rounded-full
          bg-violet-600
          transition-all duration-500
        "
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;