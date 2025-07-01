import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { executeGraphQL } from "@/lib/graphql";
import { CollectionsListDocument } from "@/gql/graphql";

// Popular brand logos and names (using collections as brand representation)
const brandLogos: Record<string, string> = {
	"fresh-collection": "🥬",
	"dairy-collection": "🥛",
	"meat-collection": "🥩",
	"beverages-collection": "🥤",
	"snacks-collection": "🍿",
	"frozen-collection": "🧊",
	"personal-care-collection": "🧴",
	"household-collection": "🧽",
	default: "🏪",
};

// Brand colors for visual variety
const brandColors = [
	"bg-red-50 text-red-600",
	"bg-blue-50 text-blue-600",
	"bg-green-50 text-green-600",
	"bg-yellow-50 text-yellow-600",
	"bg-purple-50 text-purple-600",
	"bg-pink-50 text-pink-600",
	"bg-indigo-50 text-indigo-600",
	"bg-orange-50 text-orange-600",
];

function getBrandLogo(slug: string): string {
	return brandLogos[slug] || brandLogos.default;
}

function getBrandColor(index: number): string {
	return brandColors[index % brandColors.length];
}

interface BrandShowcaseProps {
	channel: string;
}

export async function BrandShowcase({ channel }: BrandShowcaseProps) {
	// Fetch collections to represent brands with error handling
	let collections = null;

	try {
		const result = await executeGraphQL(CollectionsListDocument, {
			variables: { first: 8, channel },
			revalidate: 60 * 60, // Cache for 1 hour
		});
		collections = result.collections;
	} catch (error) {
		// Log error for debugging but continue with null collections
		console.warn("Failed to fetch collections for BrandShowcase:", error);
		// collections remains null
	}

	if (!collections?.edges?.length) {
		return null;
	}

	return (
		<section className="bg-chaldal-gray-light py-8 sm:py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Chaldal-style section header */}
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-bold text-chaldal-gray-dark sm:text-3xl">Popular on FreshMart</h2>
					<p className="mt-2 text-chaldal-gray-medium">Trusted brands and collections our customers love</p>
				</div>

				{/* Horizontal scrolling brand showcase */}
				<div className="relative">
					{/* Gradient overlays for scroll indication */}
					<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-chaldal-gray-light to-transparent" />
					<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-chaldal-gray-light to-transparent" />

					{/* Scrollable brand container */}
					<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
						{collections.edges.map(({ node: collection }, index) => (
							<LinkWithChannel
								key={collection.id}
								href={`/collections/${collection.slug}`}
								className="group flex-shrink-0"
							>
								<div
									className={`
									card-chaldal relative h-32 w-32 overflow-hidden rounded-lg bg-white 
									p-6 shadow-sm transition-all duration-300
									hover:-translate-y-1 hover:shadow-lg sm:h-40 sm:w-40
								`}
								>
									{/* Brand logo/icon */}
									<div className="flex h-full flex-col items-center justify-center text-center">
										<div
											className={`
											mb-2 flex h-12 w-12 items-center justify-center rounded-full transition-transform 
											duration-300 group-hover:scale-110 sm:h-16 sm:w-16
											${getBrandColor(index)}
										`}
										>
											<span className="text-2xl sm:text-3xl">{getBrandLogo(collection.slug)}</span>
										</div>

										{/* Brand name */}
										<h3 className="line-clamp-2 text-xs font-semibold leading-tight text-chaldal-gray-dark sm:text-sm">
											{collection.name}
										</h3>

										{/* Product count */}
										<p className="mt-1 text-xs text-chaldal-gray-medium">
											{collection.products?.totalCount || 0} items
										</p>
									</div>

									{/* Hover effect overlay */}
									<div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-300 group-hover:border-chaldal-green/20" />
								</div>
							</LinkWithChannel>
						))}
					</div>
				</div>

				{/* View all brands link */}
				<div className="mt-8 text-center">
					<LinkWithChannel
						href="/collections"
						className="text-sm font-medium text-chaldal-green transition-colors duration-200 hover:text-chaldal-green-dark"
					>
						View All Collections →
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
}
