import { SearchFilters } from "./SearchFilters";
import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";

export async function SearchFiltersContainer({ channel }: { channel: string }) {
	const { categories } = await executeGraphQL(CategoriesListDocument, {
		variables: { first: 20, channel },
		revalidate: 60 * 60, // Cache for 1 hour
	});

	const categoriesData =
		categories?.edges?.map(({ node }) => ({
			id: node.id,
			name: node.name,
			slug: node.slug,
			products: node.products ? { totalCount: node.products.totalCount || 0 } : undefined,
		})) || [];

	return <SearchFilters categories={categoriesData} />;
}
