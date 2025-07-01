"use client";

import { useState } from "react";
import { ChevronDownIcon, GlobeIcon } from "lucide-react";

export function LanguageToggle() {
	const [selectedLanguage, setSelectedLanguage] = useState("EN");
	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: "EN", name: "English" },
		{ code: "BN", name: "বাংলা" },
	];

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-1 text-chaldal-gray-dark transition-colors hover:text-chaldal-green"
			>
				<GlobeIcon className="h-4 w-4" />
				<span className="text-sm font-medium">{selectedLanguage}</span>
				<ChevronDownIcon className="h-3 w-3" />
			</button>

			{isOpen && (
				<div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border border-gray-200 bg-white shadow-lg">
					<div className="py-2">
						{languages.map((language) => (
							<button
								key={language.code}
								onClick={() => {
									setSelectedLanguage(language.code);
									setIsOpen(false);
								}}
								className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-chaldal-gray-light ${
									selectedLanguage === language.code
										? "bg-green-50 font-medium text-chaldal-green"
										: "text-chaldal-gray-dark"
								}`}
							>
								{language.name}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
