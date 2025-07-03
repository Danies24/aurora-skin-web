
"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import AuthModalManager from "./auth/AuthModalManager";

export default function GlobalAuthModal() {
  const { isOpen, redirectTo, closeAuthModal } = useAuthModal();

  return (
    <AuthModalManager
      isOpen={isOpen}
      onClose={closeAuthModal}
      redirectTo={redirectTo}
    />
  );
}
