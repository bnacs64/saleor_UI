"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface LoginFormData {
	email: string;
	password: string;
}

interface FormErrors {
	email?: string;
	password?: string;
	general?: string;
}

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { signIn } = useSaleorAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	// Get success message from URL params (e.g., after registration)
	const message = searchParams.get("message");

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setErrors({});

		try {
			const result = await signIn({
				email: formData.email,
				password: formData.password,
			});

			// Check if signIn was successful
			if (result.data?.tokenCreate?.token) {
				// Login successful - redirect to home or intended page
				const redirectTo = searchParams.get("redirect") || "/";
				router.push(redirectTo);
			} else {
				// Handle authentication errors
				setErrors({ general: "Invalid email or password. Please try again." });
			}
		} catch (error) {
			console.error("Login error:", error);
			setErrors({ general: "An unexpected error occurred. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-8 w-full max-w-md">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-chaldal-gray-dark">Welcome Back</h1>
					<p className="mt-2 text-sm text-chaldal-gray-medium">Sign in to your FreshMart account</p>
				</div>

				{message && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">{message}</div>}

				{errors.general && (
					<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.general}</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-chaldal-gray-dark">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chaldal-green ${
								errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your email"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-chaldal-gray-dark">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chaldal-green ${
								errors.password ? "border-red-300 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your password"
						/>
						{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 text-chaldal-green focus:ring-chaldal-green"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-chaldal-gray-medium">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<LinkWithChannel
								href="/forgot-password"
								className="font-medium text-chaldal-green hover:text-chaldal-green-dark"
							>
								Forgot password?
							</LinkWithChannel>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="btn-chaldal-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-chaldal-gray-medium">
						Don&apos;t have an account?{" "}
						<LinkWithChannel
							href="/signup"
							className="font-medium text-chaldal-green hover:text-chaldal-green-dark"
						>
							Create account
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
