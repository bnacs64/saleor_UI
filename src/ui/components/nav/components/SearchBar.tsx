import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";

// Fallback search suggestions
const fallbackSearchSuggestions = [
	"Fresh fruits",
	"Vegetables",
	"Dairy products",
	"Bread & bakery",
	"Meat & seafood",
	"Organic produce",
	"Snacks",
	"Beverages",
	"Frozen foods",
	"Pantry essentials",
	"Baby food",
	"Personal care",
];

export const SearchBar = async ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	// Fetch categories for dynamic search suggestions
	const { categories } = await executeGraphQL(CategoriesListDocument, {
		variables: { first: 10, channel },
		revalidate: 60 * 60, // Cache for 1 hour
	});

	// Use category names as search suggestions, fallback to static suggestions
	const searchSuggestions = categories?.edges?.length
		? categories.edges.map(({ node }) => node.name)
		: fallbackSearchSuggestions;

	// Get a random suggestion for placeholder
	const randomSuggestion = searchSuggestions[Math.floor(Math.random() * searchSuggestions.length)];

	return (
		<form
			action={onSubmit}
			className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
		>
			<label className="w-full">
				<span className="sr-only">search for groceries and products</span>
				<input
					type="text"
					name="search"
					placeholder={`Search for ${randomSuggestion.toLowerCase()}...`}
					autoComplete="on"
					required
					className="h-10 w-full rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm text-black transition-colors duration-200 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500"
				/>
			</label>
			<div className="absolute inset-y-0 right-0">
				<button
					type="submit"
					className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-primary-600 focus:text-primary-600 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">search</span>
					<SearchIcon aria-hidden className="h-5 w-5" />
				</button>
			</div>
		</form>
	);
};
