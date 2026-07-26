import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | FocusFlow",
  description: "Create your FocusFlow account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <AuthCard title="Create your account" subtitle="Join FocusFlow today">
      <RegisterForm />
    </AuthCard>
  );
}
