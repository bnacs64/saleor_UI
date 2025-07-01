import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";

// Chaldal-style category images and colors
const categoryImages: Record<string, string> = {
	"fresh-produce": "🥬",
	"fruits-vegetables": "🥬",
	"dairy-eggs": "🥛",
	"meat-seafood": "🥩",
	"meat-fish": "🥩",
	pantry: "🏺",
	cooking: "🍳",
	beverages: "🥤",
	snacks: "🍿",
	frozen: "🧊",
	"personal-care": "🧴",
	"beauty-products": "💄",
	household: "🧽",
	"home-cleaning": "🧽",
	"baby-care": "👶",
	bakery: "🍞",
	international: "🌍",
	"stationery-office": "📝",
	"health-products": "💊",
	"pest-control": "🐛",
	"pet-care": "🐕",
	"kitchen-appliances": "🔌",
	default: "🛒",
};

// Chaldal-style background colors for categories
const categoryColors: Record<string, string> = {
	"fresh-produce": "bg-green-100",
	"fruits-vegetables": "bg-green-100",
	"dairy-eggs": "bg-blue-100",
	"meat-seafood": "bg-red-100",
	"meat-fish": "bg-red-100",
	pantry: "bg-yellow-100",
	cooking: "bg-orange-100",
	beverages: "bg-purple-100",
	snacks: "bg-pink-100",
	frozen: "bg-cyan-100",
	"personal-care": "bg-indigo-100",
	"beauty-products": "bg-pink-100",
	household: "bg-gray-100",
	"home-cleaning": "bg-gray-100",
	"baby-care": "bg-pink-100",
	bakery: "bg-amber-100",
	international: "bg-emerald-100",
	"stationery-office": "bg-slate-100",
	"health-products": "bg-green-100",
	"pest-control": "bg-yellow-100",
	"pet-care": "bg-orange-100",
	"kitchen-appliances": "bg-blue-100",
	default: "bg-gray-100",
};

function getCategoryImage(slug: string): string {
	return categoryImages[slug] || categoryImages.default;
}

function getCategoryColor(slug: string): string {
	return categoryColors[slug] || categoryColors.default;
}

interface CategoryGridProps {
	channel: string;
}

export async function CategoryGrid({ channel }: CategoryGridProps) {
	let categories = null;

	try {
		const result = await executeGraphQL(CategoriesListDocument, {
			variables: { first: 20, channel },
			revalidate: 60 * 60, // Cache for 1 hour
		});
		categories = result.categories;
	} catch (error) {
		// Log error for debugging but continue with null categories
		console.warn("Failed to fetch categories for CategoryGrid:", error);
		// categories remains null
	}

	if (!categories?.edges?.length) {
		return null;
	}

	return (
		<section className="bg-white py-8 sm:py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Chaldal-style section header */}
				<div className="mb-8 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-chaldal-gray-dark sm:text-3xl">Popular Categories</h2>
					<LinkWithChannel
						href="/categories"
						className="text-sm font-medium text-chaldal-green transition-colors duration-200 hover:text-chaldal-green-dark"
					>
						View All
					</LinkWithChannel>
				</div>

				{/* Chaldal-style category grid */}
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{categories.edges.slice(0, 12).map(({ node: category }) => (
						<LinkWithChannel key={category.id} href={`/categories/${category.slug}`} className="group block">
							{/* Large image card like Chaldal */}
							<div className="card-chaldal relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								{/* Category image container */}
								<div
									className={`flex aspect-square items-center justify-center p-6 ${getCategoryColor(
										category.slug,
									)}`}
								>
									<div className="text-6xl transition-transform duration-300 group-hover:scale-110">
										{getCategoryImage(category.slug)}
									</div>
								</div>

								{/* Category name below image */}
								<div className="p-3 text-center">
									<h3 className="line-clamp-2 text-sm font-semibold leading-tight text-chaldal-gray-dark">
										{category.name}
									</h3>
								</div>

								{/* Hover effect overlay */}
								<div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-300 group-hover:border-chaldal-green/20" />
							</div>
						</LinkWithChannel>
					))}
				</div>

				{/* View all button - Chaldal style */}
				<div className="mt-8 text-center">
					<LinkWithChannel
						href="/categories"
						className="btn-chaldal-primary inline-flex items-center gap-2 text-base font-semibold"
					>
						View All Categories
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
}
