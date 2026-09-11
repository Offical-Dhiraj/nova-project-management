const Spinner = ({
  size = "md",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <span
      className={`
        inline-block
        animate-spin
        rounded-full
        border-2
        border-slate-200
        border-t-violet-600
        dark:border-slate-700
        dark:border-t-violet-400
        ${sizes[size]}
      `}
      aria-label="Loading"
    />
  );
};

export default Spinner;