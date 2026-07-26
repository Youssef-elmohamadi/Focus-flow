"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthInput } from "./AuthInput";
import { SubmitButton } from "./SubmitButton";
import { authService } from "@/services/auth.service";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    try {
      await authService.register(data);
      reset();
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response?.status === 400) {
        setApiError(error.response.data?.message || "Email Already Exist");
      } else {
        setApiError(error.message || "An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
        registration={register("name")}
        error={errors.name}
        autoFocus
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        registration={register("email")}
        error={errors.email}
      />
      
      <AuthInput
        label="Password"
        type="password"
        placeholder="••••••••"
        registration={register("password")}
        error={errors.password}
      />

      {apiError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
          {apiError}
        </div>
      )}

      <div className="mt-2">
        <SubmitButton isLoading={isSubmitting}>Sign Up</SubmitButton>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-green-600 hover:text-green-500">
          Sign in
        </Link>
      </p>
    </form>
  );
};
