"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		// Clear authentication tokens
		localStorage.removeItem("saleor-auth-token");
		localStorage.removeItem("saleor-refresh-token");

		// Trigger a custom event to notify other components about auth state change
		window.dispatchEvent(
			new CustomEvent("authStateChanged", {
				detail: { user: null, action: "logout" },
			}),
		);

		// Redirect to home page
		router.push("/");
	}, [router]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900">Logging out...</h1>
				<p className="mt-2 text-gray-600">Please wait while we sign you out.</p>
			</div>
		</div>
	);
}
