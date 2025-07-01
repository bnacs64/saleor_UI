"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "FreshMart";

export const Logo = () => {
	const pathname = usePathname();

	const logoContent = (
		<div className="flex items-center">
			<div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg mr-2">
				<span className="text-white text-lg font-bold">🛒</span>
			</div>
			<span className="text-xl font-bold text-primary-700">{companyName}</span>
		</div>
	);

	if (pathname === "/") {
		return (
			<h1 className="flex items-center" aria-label="homepage">
				{logoContent}
			</h1>
		);
	}
	return (
		<LinkWithChannel aria-label="homepage" href="/" className="flex items-center">
			{logoContent}
		</LinkWithChannel>
	);
};
