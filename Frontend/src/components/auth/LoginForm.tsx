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

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      await authService.login({ email: data.email, password: data.password });
      window.location.href = "/dashboard";
    } catch (error: any) {
      if (error.response?.status === 401) {
        setApiError(error.response.data?.message || "Invalid password or email");
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        registration={register("email")}
        error={errors.email}
        autoFocus
      />
      
      <div className="flex flex-col gap-1 w-full">
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          registration={register("password")}
          error={errors.password}
        />
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-green-600 focus:ring-green-500 accent-green-600 w-4 h-4"
              {...register("rememberMe")}
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-500">
            Forgot password?
          </Link>
        </div>
      </div>

      {apiError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
          {apiError}
        </div>
      )}

      <div className="mt-2">
        <SubmitButton isLoading={isSubmitting}>Sign In</SubmitButton>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-2">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-green-600 hover:text-green-500">
          Sign up
        </Link>
      </p>
    </form>
  );
};
