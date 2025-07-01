"use client";

import { useState, useEffect } from "react";
import { UserIcon, UserPlus } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export function UserMenuContainer() {
	const [user, setUser] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUser = async () => {
		try {
			const token = localStorage.getItem("saleor-auth-token");
			if (!token) {
				setUser(null);
				setIsLoading(false);
				return;
			}

			const query = `
				query CurrentUser {
					me {
						id
						email
						firstName
						lastName
					}
				}
			`;

			const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL!, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: query,
				}),
			});

			const result = await response.json();

			if (result.data?.me) {
				setUser(result.data.me);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.warn("Failed to fetch current user:", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();

		// Listen for authentication state changes
		const handleAuthStateChange = (event: CustomEvent) => {
			const { user: newUser, action } = event.detail;
			if (action === "login" && newUser) {
				setUser(newUser);
			} else if (action === "logout") {
				setUser(null);
			}
		};

		window.addEventListener("authStateChanged", handleAuthStateChange as EventListener);

		return () => {
			window.removeEventListener("authStateChanged", handleAuthStateChange as EventListener);
		};
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center space-x-2">
				<div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
			</div>
		);
	}

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<div className="flex items-center space-x-2">
				{/* Sign In Link */}
				<LinkWithChannel
					href="/login"
					className="text-chaldal-gray-dark hover:bg-chaldal-gray-light flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
				>
					<UserIcon className="h-4 w-4" aria-hidden="true" />
					<span className="hidden sm:inline">Sign In</span>
				</LinkWithChannel>

				{/* Sign Up Link */}
				<LinkWithChannel
					href="/signup"
					className="bg-chaldal-green hover:bg-chaldal-green-dark flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
				>
					<UserPlus className="h-4 w-4" aria-hidden="true" />
					<span className="hidden sm:inline">Sign Up</span>
				</LinkWithChannel>
			</div>
		);
	}
}
