const Tooltip = ({
  children,
  content,
}) => {
  return (
    <div className="group relative inline-flex">
      {children}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[calc(100%+8px)]
          left-1/2
          z-50
          -translate-x-1/2
          scale-95
          whitespace-nowrap
          rounded-lg
          bg-slate-950
          px-2.5
          py-1.5
          text-[11px]
          font-medium
          text-white
          opacity-0
          shadow-lg
          transition-all

          group-hover:scale-100
          group-hover:opacity-100
        "
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;