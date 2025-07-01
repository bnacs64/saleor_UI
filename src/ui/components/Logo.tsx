"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "FreshMart";

export const Logo = () => {
	const pathname = usePathname();

	const logoContent = (
		<div className="flex items-center space-x-2">
			<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chaldal-green">
				<span className="text-lg font-bold text-white">🛒</span>
			</div>
			<span className="text-xl font-bold text-chaldal-green">{companyName}</span>
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
