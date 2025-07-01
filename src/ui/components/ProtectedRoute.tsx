"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
}

interface ProtectedRouteProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem("saleor-auth-token");
				if (!token) {
					// Redirect to login with return URL
					const redirectUrl = encodeURIComponent(pathname);
					router.push(`/login?redirect=${redirectUrl}`);
					return;
				}

				// Verify token with API
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
					// Token is invalid, clear storage and redirect
					localStorage.removeItem("saleor-auth-token");
					localStorage.removeItem("saleor-refresh-token");
					const redirectUrl = encodeURIComponent(pathname);
					router.push(`/login?redirect=${redirectUrl}`);
				}
			} catch (error) {
				console.error("Auth check failed:", error);
				const redirectUrl = encodeURIComponent(pathname);
				router.push(`/login?redirect=${redirectUrl}`);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, [router, pathname]);

	if (isLoading) {
		return (
			fallback || (
				<div className="flex items-center justify-center p-8">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
					<span className="ml-2">Loading...</span>
				</div>
			)
		);
	}

	if (!user) {
		return null; // Will redirect to login
	}

	return <>{children}</>;
}
