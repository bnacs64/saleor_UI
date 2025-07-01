"use client";

import { useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "lucide-react";

export function LocationSelector() {
	const [selectedLocation, setSelectedLocation] = useState("Dhaka");
	const [isOpen, setIsOpen] = useState(false);

	const locations = ["Dhaka", "Chattogram", "Jashore", "Sylhet", "Rajshahi", "Khulna"];

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-1 text-chaldal-gray-dark transition-colors hover:text-chaldal-green"
			>
				<MapPinIcon className="h-4 w-4" />
				<span className="text-sm font-medium">{selectedLocation}</span>
				<ChevronDownIcon className="h-3 w-3" />
			</button>

			{isOpen && (
				<div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
					<div className="py-2">
						<div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-chaldal-gray-medium">
							Select Location
						</div>
						{locations.map((location) => (
							<button
								key={location}
								onClick={() => {
									setSelectedLocation(location);
									setIsOpen(false);
								}}
								className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-chaldal-gray-light ${
									selectedLocation === location
										? "bg-green-50 font-medium text-chaldal-green"
										: "text-chaldal-gray-dark"
								}`}
							>
								{location}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
