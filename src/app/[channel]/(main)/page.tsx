import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { HeroSection } from "@/ui/components/HeroSection";
import { CategoryGrid } from "@/ui/components/CategoryGrid";
import { PromotionalBanners, DeliveryInfoBanner } from "@/ui/components/PromotionalBanners";

export const metadata = {
	title: "Fresh Groceries Delivered Fast - Your Online Grocery Store",
	description:
		"Shop fresh produce, pantry essentials, and household items online. Same-day delivery available. Free delivery on orders over $50.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	const products = data.collection?.products?.edges.map(({ node: product }) => product) || [];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<HeroSection />

			{/* Delivery Info Banner */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<DeliveryInfoBanner />
			</div>

			{/* Category Grid */}
			<CategoryGrid />

			{/* Promotional Banners */}
			<PromotionalBanners />

			{/* Featured Products */}
			{products.length > 0 && (
				<section className="py-12 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
								Featured Products
							</h2>
							<p className="mt-4 text-lg text-gray-600">
								Handpicked favorites and seasonal specials
							</p>
						</div>
						<ProductList products={products} />
					</div>
				</section>
			)}
		</div>
	);
}
