import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface Banner {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	ctaLink: string;
	bgColor: string;
	textColor: string;
	icon: string;
}

const promotionalBanners: Banner[] = [
	{
		id: "1",
		title: "Free Delivery",
		subtitle: "On orders over $50",
		description: "Get your groceries delivered for free when you spend $50 or more",
		ctaText: "Shop Now",
		ctaLink: "/products",
		bgColor: "bg-gradient-to-r from-primary-500 to-primary-600",
		textColor: "text-white",
		icon: "🚚"
	},
	{
		id: "2",
		title: "Fresh Deals",
		subtitle: "Up to 30% off",
		description: "Save big on fresh produce and organic items this week",
		ctaText: "View Deals",
		ctaLink: "/collections/deals",
		bgColor: "bg-gradient-to-r from-secondary-500 to-secondary-600",
		textColor: "text-white",
		icon: "🥕"
	},
	{
		id: "3",
		title: "Same Day Delivery",
		subtitle: "Order by 2 PM",
		description: "Get your essentials delivered the same day when you order before 2 PM",
		ctaText: "Order Now",
		ctaLink: "/products",
		bgColor: "bg-gradient-to-r from-accent-500 to-accent-600",
		textColor: "text-white",
		icon: "⚡"
	}
];

export function PromotionalBanners() {
	return (
		<section className="py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{promotionalBanners.map((banner) => (
						<div
							key={banner.id}
							className={`${banner.bgColor} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
						>
							<div className="p-6">
								<div className="flex items-center mb-4">
									<span className="text-3xl mr-3">{banner.icon}</span>
									<div>
										<h3 className={`text-xl font-bold ${banner.textColor}`}>
											{banner.title}
										</h3>
										<p className={`text-sm ${banner.textColor} opacity-90`}>
											{banner.subtitle}
										</p>
									</div>
								</div>
								<p className={`${banner.textColor} opacity-80 mb-6 text-sm leading-relaxed`}>
									{banner.description}
								</p>
								<LinkWithChannel
									href={banner.ctaLink}
									className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
								>
									{banner.ctaText}
									<svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
									</svg>
								</LinkWithChannel>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export function DeliveryInfoBanner() {
	return (
		<div className="bg-primary-50 border-l-4 border-primary-400 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
				</div>
				<div className="ml-3">
					<p className="text-sm text-primary-700">
						<strong>Delivery Information:</strong> We deliver Monday to Saturday, 8 AM to 8 PM. 
						Minimum order $25. Free delivery on orders over $50.
					</p>
				</div>
			</div>
		</div>
	);
}
