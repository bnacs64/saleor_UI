import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";

// Fallback icons and colors for categories
const categoryIcons: Record<string, string> = {
	"fresh-produce": "🥬",
	"dairy-eggs": "🥛",
	"meat-seafood": "🥩",
	pantry: "🏺",
	beverages: "🥤",
	snacks: "🍿",
	frozen: "🧊",
	"personal-care": "🧴",
	household: "🧽",
	"baby-care": "👶",
	bakery: "🍞",
	international: "🌍",
	default: "🛒",
};

function getCategoryIcon(slug: string): string {
	return categoryIcons[slug] || categoryIcons.default;
}

interface CategoryGridProps {
	channel: string;
}

export async function CategoryGrid({ channel }: CategoryGridProps) {
	const { categories } = await executeGraphQL(CategoriesListDocument, {
		variables: { first: 20, channel },
		revalidate: 60 * 60, // Cache for 1 hour
	});

	if (!categories?.edges?.length) {
		return null;
	}

	return (
		<section className="bg-gray-50 py-8 sm:py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 text-center sm:mb-10">
					<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Shop by Category</h2>
					<p className="mt-3 text-base text-gray-600 sm:text-lg">
						Find everything you need organized by category
					</p>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
					{categories.edges.map(({ node: category }) => (
						<LinkWithChannel
							key={category.id}
							href={`/categories/${category.slug}`}
							className="group relative rounded-lg bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6"
						>
							<div className="text-center">
								<div className="mb-2 text-2xl transition-transform duration-200 group-hover:scale-110 sm:mb-3 sm:text-4xl">
									{getCategoryIcon(category.slug)}
								</div>
								<h3 className="mb-1 line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
									{category.name}
								</h3>
								<p className="line-clamp-2 hidden text-xs leading-tight text-gray-500 sm:block">
									{category.description || `Browse ${category.name.toLowerCase()}`}
								</p>
							</div>
							<div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-200 group-hover:border-primary-200" />
						</LinkWithChannel>
					))}
				</div>

				<div className="mt-8 text-center sm:mt-10">
					<LinkWithChannel
						href="/categories"
						className="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 transition-colors duration-200 hover:bg-primary-200 sm:px-6 sm:py-3 sm:text-base"
					>
						View All Categories
						<svg className="-mr-1 ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
}
