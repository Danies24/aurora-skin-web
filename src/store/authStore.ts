import { create } from "zustand";

type AuthStore = {
  phone: string;
  setPhone: (p: string) => void;
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  phone: "",
  setPhone: (p) => set({ phone: p }),
  isLoggedIn: false,
  setLoggedIn: (v) => set({ isLoggedIn: v }),
}));
