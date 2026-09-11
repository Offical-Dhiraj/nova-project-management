const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
    >
      <div>
        {eyebrow && (
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-violet-600
              dark:text-violet-400
            "
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="
            mt-1
            text-2xl
            font-extrabold
            tracking-tight
            text-slate-950
            sm:text-3xl
            dark:text-white
          "
        >
          {title}
        </h1>

        {description && (
          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;