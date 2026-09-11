import Spinner from "../ui/Spinner";

const LoadingScreen = () => {
  return (
    <div
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-slate-50

        dark:bg-slate-950
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
            flex h-12 w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-600
            text-lg
            font-extrabold
            text-white
            shadow-lg
            shadow-violet-600/20
          "
        >
          N
        </div>

        <Spinner
          size="sm"
        />

        <p
          className="
            mt-4
            text-xs
            font-medium
            text-slate-400
          "
        >
          Loading NOVA...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;