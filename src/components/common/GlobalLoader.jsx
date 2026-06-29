import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const loading = isFetching > 0 || isMutating > 0;

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    </div>
  );
}