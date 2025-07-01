"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

interface SearchBarProps {
	channel: string;
}

export function SearchBar({ channel }: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/${channel}/search?query=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className="relative w-full">
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={handleInputChange}
					placeholder="Search for groceries, brands, and more..."
					className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-12 text-sm placeholder-gray-500 focus:border-chaldal-green focus:outline-none focus:ring-2 focus:ring-chaldal-green/20"
				/>
				<button
					type="submit"
					className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md bg-chaldal-green p-1.5 text-white transition-colors hover:bg-chaldal-green-dark focus:outline-none focus:ring-2 focus:ring-chaldal-green focus:ring-offset-2"
					aria-label="Search"
				>
					<svg
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>

			{/* Quick search suggestions - could be enhanced with actual search suggestions */}
			{searchQuery.length > 0 && (
				<div className="absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
					<div className="p-2">
						<LinkWithChannel
							href={`/search?query=${encodeURIComponent(searchQuery)}`}
							className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							<svg className="mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							Search for "{searchQuery}"
						</LinkWithChannel>
					</div>
				</div>
			)}
		</form>
	);
}
