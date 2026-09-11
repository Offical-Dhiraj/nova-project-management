const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "",
  trend,
  trendType = "neutral",
}) => {
  const trendStyles = {
    positive:
      "text-emerald-600 dark:text-emerald-400",
    negative:
      "text-red-600 dark:text-red-400",
    neutral:
      "text-slate-500 dark:text-slate-400",
  };

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-950
              dark:text-white
            "
          >
            {value}
          </p>

          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span
                className={`
                  text-xs
                  font-bold
                  ${trendStyles[trendType]}
                `}
              >
                {trend}
              </span>
            )}

            <span
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              {description}
            </span>
          </div>
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-violet-50
            text-violet-600
            transition-transform
            group-hover:scale-105

            dark:bg-violet-500/10
            dark:text-violet-400
            ${iconClassName}
          `}
        >
          <Icon size={21} />
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          -bottom-10
          -right-10
          h-24
          w-24
          rounded-full
          bg-violet-500/5
        "
      />
    </article>
  );
};

export default StatsCard;