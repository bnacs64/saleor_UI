import { Suspense } from "react";
import { Logo } from "./Logo";
import { ChaldalNav } from "./nav/ChaldalNav";
import { LocationSelector } from "./nav/components/LocationSelector";
import { LanguageToggle } from "./nav/components/LanguageToggle";
import { CartNavItem } from "./nav/components/CartNavItem";
import { UserMenuContainer } from "./nav/components/UserMenu/UserMenuContainer";
import { SearchBar } from "./nav/components/SearchBar";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			{/* Top utility bar - Chaldal style */}
			<div className="border-b border-gray-200 bg-chaldal-gray-light">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-10 items-center justify-between text-sm">
						<div className="flex items-center space-x-4">
							<LocationSelector />
							<div className="hidden items-center text-chaldal-gray-medium sm:flex">
								<svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
								</svg>
								support@freshmart.com
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<LanguageToggle />
							<div className="hidden items-center text-chaldal-gray-medium sm:flex">
								<svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
										clipRule="evenodd"
									/>
								</svg>
								16710
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main header - Chaldal style */}
			<div className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						{/* Logo */}
						<div className="flex items-center">
							<Logo />
						</div>

						{/* Search bar - center */}
						<div className="mx-8 hidden max-w-2xl flex-1 lg:block">
							<SearchBar channel={channel} />
						</div>

						{/* Right side actions */}
						<div className="flex items-center space-x-4">
							<Suspense fallback={<div className="h-8 w-8" />}>
								<UserMenuContainer />
							</Suspense>
							<Suspense fallback={<div className="h-8 w-8" />}>
								<CartNavItem channel={channel} />
							</Suspense>
						</div>
					</div>
				</div>
			</div>

			{/* Category navigation - Chaldal style */}
			<ChaldalNav channel={channel} />
		</header>
	);
}
