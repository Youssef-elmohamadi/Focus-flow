import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FocusFlow",
  description: "Login to your FocusFlow account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Login to your account">
      <LoginForm />
    </AuthCard>
  );
}
