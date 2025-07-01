import { Suspense } from "react";
import { type Metadata } from "next";
import { Loader } from "@/ui/atoms/Loader";
import { SignUpForm } from "@/ui/components/SignUpForm";

export const metadata: Metadata = {
	title: "Create Account - FreshMart",
	description: "Create your FreshMart account to start shopping for fresh groceries online.",
};

export default function SignUpPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<SignUpForm />
			</section>
		</Suspense>
	);
}
