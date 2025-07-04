import { Suspense } from "react";
import { type Metadata } from "next";
import { Loader } from "@/ui/atoms/Loader";
import { LoginForm } from "@/ui/components/LoginForm";

export const metadata: Metadata = {
	title: "Sign In - FreshMart",
	description: "Sign in to your FreshMart account to continue shopping for fresh groceries.",
};

export default function LoginPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<LoginForm />
			</section>
		</Suspense>
	);
}
