"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface FilterOption {
	id: string;
	name: string;
	count?: number;
}

interface FilterSection {
	id: string;
	name: string;
	options: FilterOption[];
}

interface SearchFiltersProps {
	categories?: Array<{
		id: string;
		name: string;
		slug: string;
		products?: { totalCount: number };
	}>;
}

// Fallback filters when no dynamic data is available
const fallbackFilters: FilterSection[] = [
	{
		id: "category",
		name: "Category",
		options: [
			{ id: "fresh-produce", name: "Fresh Produce", count: 45 },
			{ id: "dairy-eggs", name: "Dairy & Eggs", count: 23 },
			{ id: "meat-seafood", name: "Meat & Seafood", count: 18 },
			{ id: "pantry", name: "Pantry Essentials", count: 67 },
			{ id: "beverages", name: "Beverages", count: 34 },
			{ id: "snacks", name: "Snacks", count: 29 },
			{ id: "frozen", name: "Frozen Foods", count: 21 },
			{ id: "personal-care", name: "Personal Care", count: 15 },
		],
	},
	{
		id: "dietary",
		name: "Dietary Preferences",
		options: [
			{ id: "organic", name: "Organic", count: 32 },
			{ id: "gluten-free", name: "Gluten Free", count: 18 },
			{ id: "vegan", name: "Vegan", count: 24 },
			{ id: "vegetarian", name: "Vegetarian", count: 41 },
			{ id: "keto", name: "Keto Friendly", count: 12 },
			{ id: "low-sodium", name: "Low Sodium", count: 16 },
		],
	},
	{
		id: "price",
		name: "Price Range",
		options: [
			{ id: "under-5", name: "Under $5", count: 45 },
			{ id: "5-10", name: "$5 - $10", count: 38 },
			{ id: "10-20", name: "$10 - $20", count: 29 },
			{ id: "20-50", name: "$20 - $50", count: 18 },
			{ id: "over-50", name: "Over $50", count: 8 },
		],
	},
];

export function SearchFilters({ categories }: SearchFiltersProps) {
	// Build dynamic filters from categories
	const dynamicFilters: FilterSection[] = [
		// Categories section from Saleor data
		...(categories?.length
			? [
					{
						id: "category",
						name: "Category",
						options: categories.map((category) => ({
							id: category.slug,
							name: category.name,
							count: category.products?.totalCount || 0,
						})),
					},
				]
			: []),
		// Keep dietary and price filters as static for now
		...fallbackFilters.filter((section) => section.id !== "category"),
	];

	// Use dynamic filters if available, otherwise fallback
	const groceryFilters = dynamicFilters.length > 0 ? dynamicFilters : fallbackFilters;

	const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["category", "dietary"]));
	const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

	const toggleSection = (sectionId: string) => {
		const newExpanded = new Set(expandedSections);
		if (newExpanded.has(sectionId)) {
			newExpanded.delete(sectionId);
		} else {
			newExpanded.add(sectionId);
		}
		setExpandedSections(newExpanded);
	};

	const toggleFilter = (filterId: string) => {
		const newSelected = new Set(selectedFilters);
		if (newSelected.has(filterId)) {
			newSelected.delete(filterId);
		} else {
			newSelected.add(filterId);
		}
		setSelectedFilters(newSelected);
	};

	const clearAllFilters = () => {
		setSelectedFilters(new Set());
	};

	const hasActiveFilters = selectedFilters.size > 0;

	return (
		<div className="w-full">
			{/* Filter Header */}
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Filters</h3>
				{hasActiveFilters && (
					<button
						onClick={clearAllFilters}
						className="text-sm font-medium text-primary-600 hover:text-primary-700"
					>
						Clear all
					</button>
				)}
			</div>

			{/* Active Filters */}
			{hasActiveFilters && (
				<div className="mb-6">
					<h4 className="mb-2 text-sm font-medium text-gray-700">Active filters:</h4>
					<div className="flex flex-wrap gap-2">
						{Array.from(selectedFilters).map((filterId) => {
							const filter = groceryFilters
								.flatMap((section) => section.options)
								.find((option) => option.id === filterId);

							if (!filter) return null;

							return (
								<span
									key={filterId}
									className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800"
								>
									{filter.name}
									<button
										onClick={() => toggleFilter(filterId)}
										className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-primary-600 hover:bg-primary-200 hover:text-primary-800"
									>
										<span className="sr-only">Remove filter</span>
										<svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
											<path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6-6 6" />
										</svg>
									</button>
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* Filter Sections */}
			<div className="space-y-4">
				{groceryFilters.map((section) => (
					<div key={section.id} className="border-b border-gray-200 pb-4">
						<button
							onClick={() => toggleSection(section.id)}
							className="flex w-full items-center justify-between py-2 text-left"
						>
							<span className="text-sm font-medium text-gray-900">{section.name}</span>
							{expandedSections.has(section.id) ? (
								<ChevronUpIcon className="h-4 w-4 text-gray-500" />
							) : (
								<ChevronDownIcon className="h-4 w-4 text-gray-500" />
							)}
						</button>

						{expandedSections.has(section.id) && (
							<div className="mt-2 space-y-2">
								{section.options.map((option) => (
									<label
										key={option.id}
										className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-gray-50"
									>
										<input
											type="checkbox"
											checked={selectedFilters.has(option.id)}
											onChange={() => toggleFilter(option.id)}
											className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<span className="ml-2 flex-1 text-sm text-gray-700">{option.name}</span>
										{option.count && <span className="text-xs text-gray-500">({option.count})</span>}
									</label>
								))}
							</div>
						)}
					</div>
				))}
			</div>

			{/* Apply Filters Button */}
			<div className="mt-6">
				<button className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
					Apply Filters
				</button>
			</div>
		</div>
	);
}
