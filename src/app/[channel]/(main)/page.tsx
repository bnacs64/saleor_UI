import { type Metadata } from "next";
import { HeroSection } from "@/ui/components/HeroSection";
import { BrandShowcase } from "@/ui/components/BrandShowcase";
import { ShopAndGetMore } from "@/ui/components/ShopAndGetMore";
import { ProductList } from "@/ui/components/ProductList";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { executeGraphQL } from "@/lib/graphql";
import { ProductListPaginatedDocument } from "@/gql/graphql";

export const metadata: Metadata = {
	title: "FreshMart - Fresh Groceries Delivered in 1 Hour",
	description: "Shop fresh produce, daily essentials, and household items online. Fast delivery, best prices, and quality guaranteed. Your trusted grocery partner.",
};

export default async function HomePage(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	
	// Fetch featured products for the homepage with error handling
	let featuredProducts = null;
	try {
		const result = await executeGraphQL(ProductListPaginatedDocument, {
			variables: {
				first: 8, // Show 8 featured products on homepage
				channel: params.channel,
			},
			revalidate: 60 * 30, // Cache for 30 minutes
		});
		featuredProducts = result.products;
	} catch (error) {
		console.warn("Failed to fetch featured products for homepage:", error);
		// featuredProducts remains null
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<HeroSection />

			{/* Brand/Category Showcase */}
			<BrandShowcase channel={params.channel} />

			{/* Featured Products Section */}
			{featuredProducts?.edges?.length ? (
				<section className="bg-gray-50 py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-8 text-center">
							<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured Products</h2>
							<p className="mt-2 text-gray-600">Discover our most popular items</p>
						</div>
						
						<ProductList products={featuredProducts.edges.map((e) => e.node)} />
						
						<div className="mt-8 text-center">
							<LinkWithChannel
								href="/products"
								className="inline-flex items-center justify-center rounded-md bg-chaldal-green px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-chaldal-green-dark focus:outline-none focus:ring-2 focus:ring-chaldal-green focus:ring-offset-2"
							>
								View All Products
								<svg
									className="ml-2 h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</LinkWithChannel>
						</div>
					</div>
				</section>
			) : null}

			{/* Shop & Get More Section */}
			<ShopAndGetMore />
		</div>
	);
}
