"use client";

import { useState } from "react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface ForgotPasswordFormData {
	email: string;
}

interface FormErrors {
	email?: string;
	general?: string;
}

export function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [formData, setFormData] = useState<ForgotPasswordFormData>({
		email: "",
	});

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
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
			// TODO: Implement password reset request using Saleor API
			// This would use the requestPasswordReset mutation from the GraphQL schema

			// For now, simulate the API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setIsSuccess(true);
		} catch (error) {
			console.error("Password reset error:", error);
			setErrors({ general: "An unexpected error occurred. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="mx-auto mt-8 w-full max-w-md">
				<div className="rounded-lg bg-white p-8 shadow-lg">
					<div className="mb-6 text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
							<svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h1 className="text-2xl font-bold text-chaldal-gray-dark">Check Your Email</h1>
						<p className="mt-2 text-sm text-chaldal-gray-medium">
							We&apos;ve sent a password reset link to <strong>{formData.email}</strong>
						</p>
					</div>

					<div className="space-y-4">
						<p className="text-sm text-chaldal-gray-medium">
							If you don&apos;t see the email in your inbox, please check your spam folder.
						</p>

						<div className="text-center">
							<LinkWithChannel href="/login" className="btn-chaldal-primary inline-block">
								Back to Sign In
							</LinkWithChannel>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto mt-8 w-full max-w-md">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-chaldal-gray-dark">Forgot Password?</h1>
					<p className="mt-2 text-sm text-chaldal-gray-medium">
						Enter your email address and we&apos;ll send you a link to reset your password
					</p>
				</div>

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
							placeholder="Enter your email address"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="btn-chaldal-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? "Sending..." : "Send Reset Link"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-chaldal-gray-medium">
						Remember your password?{" "}
						<LinkWithChannel
							href="/login"
							className="font-medium text-chaldal-green hover:text-chaldal-green-dark"
						>
							Sign in
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
