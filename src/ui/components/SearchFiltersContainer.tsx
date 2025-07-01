import { SearchFilters } from "./SearchFilters";
import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";

export async function SearchFiltersContainer({ channel }: { channel: string }) {
	let categoriesData: Array<{
		id: string;
		name: string;
		slug: string;
		products?: { totalCount: number };
	}> = [];

	try {
		const { categories } = await executeGraphQL(CategoriesListDocument, {
			variables: { first: 20, channel },
			revalidate: 60 * 60, // Cache for 1 hour
		});

		categoriesData =
			categories?.edges?.map(({ node }) => ({
				id: node.id,
				name: node.name,
				slug: node.slug,
				products: node.products ? { totalCount: node.products.totalCount || 0 } : undefined,
			})) || [];
	} catch (error) {
		// Log error for debugging but continue with empty categories
		console.warn("Failed to fetch categories for search filters:", error);
		// categoriesData remains empty array
	}

	return <SearchFilters categories={categoriesData} />;
}
