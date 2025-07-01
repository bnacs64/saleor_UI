import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200">
			{/* Top banner with delivery info */}
			<div className="bg-primary-600 text-white py-2">
				<div className="mx-auto max-w-7xl px-3 sm:px-8">
					<div className="flex items-center justify-center text-sm">
						<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
							<path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM6 7a1 1 0 011-1h1a1 1 0 011 1v3a1 1 0 01-.293.707L8 11.414V15a1 1 0 01-1 1H6a1 1 0 01-1-1v-3.586l-.707-.707A1 1 0 014 11V8a1 1 0 011-1z" />
						</svg>
						<span className="hidden sm:inline">Free delivery on orders over $50 • </span>
						<span>Same-day delivery available</span>
					</div>
				</div>
			</div>

			{/* Main header */}
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="flex h-16 justify-between gap-4 md:gap-8">
					<Logo />
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
