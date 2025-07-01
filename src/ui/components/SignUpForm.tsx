"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "urql";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { UserRegisterDocument, type AccountError, type UserRegisterMutation } from "@/checkout/graphql";

interface SignUpFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	general?: string;
}

export function SignUpForm() {
	const router = useRouter();
	const [, userRegister] = useMutation<UserRegisterMutation>(UserRegisterDocument);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [formData, setFormData] = useState<SignUpFormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters long";
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
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
			const result = await userRegister({
				input: {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					channel: "default-channel",
					redirectUrl: `${window.location.origin}/account-confirm`,
				},
			});

			if (result.error) {
				setErrors({ general: "An unexpected error occurred. Please try again." });
				return;
			}

			if (result.data?.accountRegister?.errors && result.data.accountRegister.errors.length > 0) {
				const apiErrors: FormErrors = {};
				result.data.accountRegister.errors.forEach((error: AccountError) => {
					const message = error.message || "An error occurred";
					if (error.field) {
						const field = error.field as keyof FormErrors;
						if (field in apiErrors) {
							apiErrors[field] = message;
						} else {
							apiErrors.general = message;
						}
					} else {
						apiErrors.general = message;
					}
				});
				setErrors(apiErrors);
			} else {
				// Registration successful - redirect to login with success message
				router.push("/login?message=Account created successfully! Please sign in.");
			}
		} catch (error) {
			console.error("Registration error:", error);
			setErrors({ general: "An unexpected error occurred. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-8 w-full max-w-md">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-chaldal-gray-dark">Create Account</h1>
					<p className="mt-2 text-sm text-chaldal-gray-medium">
						Join FreshMart for fresh groceries delivered to your door
					</p>
				</div>

				{errors.general && (
					<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.general}</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-chaldal-gray-dark">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chaldal-green ${
									errors.firstName ? "border-red-300 focus:ring-red-500" : "border-gray-300"
								}`}
								placeholder="John"
							/>
							{errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
						</div>

						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-chaldal-gray-dark">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chaldal-green ${
									errors.lastName ? "border-red-300 focus:ring-red-500" : "border-gray-300"
								}`}
								placeholder="Doe"
							/>
							{errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
						</div>
					</div>

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
							placeholder="john@example.com"
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
							placeholder="••••••••"
						/>
						{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
					</div>

					<div>
						<label htmlFor="confirmPassword" className="block text-sm font-medium text-chaldal-gray-dark">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chaldal-green ${
								errors.confirmPassword ? "border-red-300 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="••••••••"
						/>
						{errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="btn-chaldal-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-chaldal-gray-medium">
						Already have an account?{" "}
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
