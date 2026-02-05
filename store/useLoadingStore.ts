"use client";

import { create } from "zustand";

type LoadingStore = {
  count: number;
  start: () => void;
  stop: () => void;
};

const useLoadingStore = create<LoadingStore>((set) => ({
  count: 0,

  start: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  stop: () =>
    set((state) => ({
      count: Math.max(0, state.count - 1),
    })),
}));

export default useLoadingStore;