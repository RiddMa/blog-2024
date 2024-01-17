import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { createWithEqualityFn } from "zustand/traditional"; // required for devtools typing
interface PageState {
  rightNavOpen: boolean;
  setRightNav: (value: boolean) => void;
  leftNavOpen: boolean;
  setLeftNav: (value: boolean) => void;
}

// export const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }));

export const usePageStateStore = createWithEqualityFn<PageState>()(
  devtools(
    persist(
      (set) => ({
        rightNavOpen: false,
        setRightNav: (value) => set(() => ({ rightNavOpen: value })),
        leftNavOpen: false,
        setLeftNav: (value) => set(() => ({ leftNavOpen: value }))
      }),
      {
        name: "bear-storage"
      }
    )
  )
);
