"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
			const mutation = `
				mutation tokenCreate($email: String!, $password: String!) {
					tokenCreate(email: $email, password: $password) {
						token
						refreshToken
						errors {
							field
							message
							code
						}
						user {
							id
							email
							firstName
							lastName
						}
					}
				}
			`;

			const variables = {
				email: formData.email,
				password: formData.password,
			};

			const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL!, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: mutation,
					variables: variables,
				}),
			});

			const result = (await response.json()) as any;

			if (result.errors) {
				setErrors({ general: "An unexpected error occurred. Please try again." });
				return;
			}

			if (result.data?.tokenCreate?.errors && result.data.tokenCreate.errors.length > 0) {
				setErrors({ general: "Invalid email or password. Please try again." });
				return;
			}

			// Check if signIn was successful
			if (result.data?.tokenCreate?.token) {
				// Store the token in localStorage for now (in a real app, you'd use proper auth management)
				localStorage.setItem("saleor-auth-token", result.data.tokenCreate.token);
				if (result.data.tokenCreate.refreshToken) {
					localStorage.setItem("saleor-refresh-token", result.data.tokenCreate.refreshToken);
				}

				// Trigger a custom event to notify other components about auth state change
				window.dispatchEvent(
					new CustomEvent("authStateChanged", {
						detail: { user: result.data.tokenCreate.user, action: "login" },
					}),
				);

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
					<h1 className="text-chaldal-gray-dark text-2xl font-bold">Welcome Back</h1>
					<p className="text-chaldal-gray-medium mt-2 text-sm">Sign in to your FreshMart account</p>
				</div>

				{message && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">{message}</div>}

				{errors.general && (
					<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.general}</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="text-chaldal-gray-dark block text-sm font-medium">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className={`focus:ring-chaldal-green mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
								errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your email"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
					</div>

					<div>
						<label htmlFor="password" className="text-chaldal-gray-dark block text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className={`focus:ring-chaldal-green mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
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
								className="text-chaldal-green focus:ring-chaldal-green h-4 w-4 rounded border-gray-300"
							/>
							<label htmlFor="remember-me" className="text-chaldal-gray-medium ml-2 block text-sm">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<LinkWithChannel
								href="/forgot-password"
								className="text-chaldal-green hover:text-chaldal-green-dark font-medium"
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
					<p className="text-chaldal-gray-medium text-sm">
						Don&apos;t have an account?{" "}
						<LinkWithChannel
							href="/signup"
							className="text-chaldal-green hover:text-chaldal-green-dark font-medium"
						>
							Create account
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
