import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lawyer } from "@/types/lawyer";

interface ComparisonStore {
  items: Lawyer[];
  addItem: (lawyer: Lawyer) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isInTray: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (lawyer) => {
        const { items } = get();
        if (items.length >= 3 || items.some((i) => i.id === lawyer.id)) return;
        set({ items: [...items, lawyer] });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clearAll: () => set({ items: [] }),
      isInTray: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "legaldir-comparison" }
  )
);
