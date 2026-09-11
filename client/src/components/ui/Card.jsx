const Card = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        shadow-slate-200/40

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-none

        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;