
"use client";

import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  redirectTo: string;
  openAuthModal: (redirectTo?: string) => void;
  closeAuthModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  redirectTo: "/cart",
  openAuthModal: (redirectTo = "/cart") => set({ isOpen: true, redirectTo }),
  closeAuthModal: () => set({ isOpen: false }),
}));
