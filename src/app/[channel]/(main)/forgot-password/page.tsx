import { Suspense } from "react";
import { type Metadata } from "next";
import { Loader } from "@/ui/atoms/Loader";
import { ForgotPasswordForm } from "@/ui/components/ForgotPasswordForm";

export const metadata: Metadata = {
	title: "Forgot Password - FreshMart",
	description: "Reset your FreshMart account password.",
};

export default function ForgotPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<ForgotPasswordForm />
			</section>
		</Suspense>
	);
}
