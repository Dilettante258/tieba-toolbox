import { create } from "zustand";

export interface UPSelectorStore {
  prevChange: "year" | "date" | "forum";
  lastChange: "year" | "date" | "forum";
  selectedDate: string;
  selectedYear: number | "ALL";
  selectedForum: string;
  setSelectedDate: (value: string) => void;
  setSelectedYear: (value: UPSelectorStore["selectedYear"]) => void;
  setSelectedForum: (value: string) => void;
}

export const useUPSelectorStore = create<UPSelectorStore>((set) => ({
  prevChange: "year",
  lastChange: "year",
  selectedDate: "",
  selectedYear: 2025,
  selectedForum: "",
  setSelectedDate: (value) =>
    set({
      selectedDate: value,
      lastChange: "date",
    }),
  setSelectedYear: (value) =>
    set({
      selectedYear: value,
      lastChange: "year",
    }),
  setSelectedForum: (value) =>
    set((state) => {
      return {
        ...state,
        selectedForum: value,
        prevChange: state.lastChange,
        lastChange: "forum",
      };
    }),
}));