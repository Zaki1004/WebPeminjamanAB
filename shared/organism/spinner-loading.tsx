"use client";

import useLoadingStore from "../../store/useLoadingStore";

const GlobalSpinner = () => {
  const count = useLoadingStore((s) => s.count);

  if (count === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="h-32 w-32 animate-spin rounded-full border-10 border-green-200 border-t-transparent" />
    </div>
  );
};

export default GlobalSpinner;
