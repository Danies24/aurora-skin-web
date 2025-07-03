
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "../ModalWrapper";
import LoginModal from "./LoginModal";
import VerifyOtpModal from "./VerifyOtpModal";
import RegisterModal from "./RegisterModal";

type AuthStep = "login" | "verify" | "register" | null;

interface AuthModalManagerProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export default function AuthModalManager({ isOpen, onClose, redirectTo = "/cart" }: AuthModalManagerProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const router = useRouter();

  const handleClose = () => {
    setCurrentStep("login");
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
    router.push(redirectTo);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "login":
        return (
          <LoginModal
            onClose={handleClose}
            onVerifyOtp={() => setCurrentStep("verify")}
          />
        );
      case "verify":
        return (
          <VerifyOtpModal
            onClose={handleClose}
            onRegister={() => setCurrentStep("register")}
            onSuccess={handleSuccess}
          />
        );
      case "register":
        return (
          <RegisterModal
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      {renderCurrentStep()}
    </ModalWrapper>
  );
}
