import { LinkWithChannel } from "../atoms/LinkWithChannel";

// Feature cards data matching Chaldal's "Shop & Get More" section
const features = [
	{
		id: "loyalty-program",
		title: "Shop & Earn Points",
		description:
			"The more you shop the more you earn - cash back, free shipping, exclusive offers and more. Discover the perks of FreshMart membership.",
		image: "🎁",
		bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
		iconColor: "text-purple-600",
		ctaText: "Join Now",
		ctaLink: "/loyalty",
	},
	{
		id: "daily-deals",
		title: "Deal of the Day",
		description:
			"Stock up on your favorite groceries for less with our unbeatable deals! Don't miss out - limited stock",
		image: "🏷️",
		bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
		iconColor: "text-orange-600",
		ctaText: "Shop Deals",
		ctaLink: "/deals",
	},
	{
		id: "premium-care",
		title: "Premium Care",
		description:
			"Too busy to place an order or handling order issues? No need to worry as we give you option to take premium assistance.",
		image: "💎",
		bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
		iconColor: "text-blue-600",
		ctaText: "Learn More",
		ctaLink: "/premium-care",
	},
	{
		id: "daily-necessities",
		title: "Shop your daily necessities",
		description:
			"Shop from our popular category, Explore special offers and receive grocery on your doorsteps within 1 hour.",
		image: "🛒",
		bgColor: "bg-gradient-to-br from-green-50 to-green-100",
		iconColor: "text-chaldal-green",
		ctaText: "Start Shopping",
		ctaLink: "/products",
	},
];

export function ShopAndGetMore() {
	return (
		<section className="bg-white py-8 sm:py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section header */}
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-bold text-chaldal-gray-dark sm:text-3xl">Shop & Get More</h2>
					<p className="mt-2 text-chaldal-gray-medium">
						Discover exclusive benefits and services designed for you
					</p>
				</div>

				{/* Feature cards grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature) => (
						<div
							key={feature.id}
							className={`
								card-chaldal group relative overflow-hidden rounded-lg p-6 shadow-sm 
								transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
								${feature.bgColor}
							`}
						>
							{/* Feature icon */}
							<div className="mb-4 flex justify-center">
								<div
									className={`
									flex h-16 w-16 items-center justify-center rounded-full 
									bg-white shadow-sm transition-transform duration-300 group-hover:scale-110
								`}
								>
									<span className="text-3xl">{feature.image}</span>
								</div>
							</div>

							{/* Feature content */}
							<div className="text-center">
								<h3 className="mb-3 text-lg font-bold text-chaldal-gray-dark">{feature.title}</h3>
								<p className="mb-4 text-sm leading-relaxed text-chaldal-gray-medium">{feature.description}</p>

								{/* CTA button */}
								<LinkWithChannel
									href={feature.ctaLink}
									className={`
										inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold 
										transition-all duration-200 hover:shadow-md
										${feature.iconColor} bg-white hover:bg-gray-50
									`}
								>
									{feature.ctaText}
									<svg
										className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</LinkWithChannel>
							</div>

							{/* Hover effect overlay */}
							<div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-300 group-hover:border-white/30" />
						</div>
					))}
				</div>

				{/* Additional info section */}
				<div className="mt-12 rounded-lg bg-chaldal-gray-light p-6 text-center">
					<div className="mx-auto max-w-3xl">
						<h3 className="mb-3 text-xl font-bold text-chaldal-gray-dark">Why Choose FreshMart?</h3>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
							<div className="text-center">
								<div className="mb-2 text-2xl">⚡</div>
								<p className="text-sm font-semibold text-chaldal-gray-dark">Fast Delivery</p>
								<p className="text-xs text-chaldal-gray-medium">Within 1 hour</p>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl">💰</div>
								<p className="text-sm font-semibold text-chaldal-gray-dark">Best Prices</p>
								<p className="text-xs text-chaldal-gray-medium">Guaranteed savings</p>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl">🥬</div>
								<p className="text-sm font-semibold text-chaldal-gray-dark">Fresh Quality</p>
								<p className="text-xs text-chaldal-gray-medium">Handpicked items</p>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl">🛡️</div>
								<p className="text-sm font-semibold text-chaldal-gray-dark">Safe Shopping</p>
								<p className="text-xs text-chaldal-gray-medium">Secure payments</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
