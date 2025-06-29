import { create } from "zustand";
import { User } from "@/lib/firebase/firebaseHelpers";

type AuthStore = {
  phone: string;
  setPhone: (p: string) => void;
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  phone: "",
  setPhone: (p) => set({ phone: p }),
  isLoggedIn: false,
  setLoggedIn: (v) => set({ isLoggedIn: v }),
  userId: null,
  setUserId: (id) => set({ userId: id }),
  user: null,
  setUser: (user) => set({ user }),
}));
