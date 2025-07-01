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
		icon: "🚚",
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
		icon: "🥕",
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
		icon: "⚡",
	},
];

export function PromotionalBanners() {
	return (
		<section className="py-8 sm:py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
					{promotionalBanners.map((banner) => (
						<div
							key={banner.id}
							className={`${banner.bgColor} overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl`}
						>
							<div className="p-4 sm:p-6">
								<div className="mb-3 flex items-center sm:mb-4">
									<span className="mr-2 text-2xl sm:mr-3 sm:text-3xl">{banner.icon}</span>
									<div>
										<h3 className={`text-lg font-bold sm:text-xl ${banner.textColor}`}>{banner.title}</h3>
										<p className={`text-xs sm:text-sm ${banner.textColor} opacity-90`}>{banner.subtitle}</p>
									</div>
								</div>
								<p
									className={`${banner.textColor} mb-4 text-xs leading-relaxed opacity-80 sm:mb-6 sm:text-sm`}
								>
									{banner.description}
								</p>
								<LinkWithChannel
									href={banner.ctaLink}
									className="inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-100 sm:px-4 sm:text-sm"
								>
									{banner.ctaText}
									<svg
										className="-mr-1 ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
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
		<div className="border-l-4 border-primary-400 bg-primary-50 p-3 sm:p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<svg className="h-4 w-4 text-primary-400 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-2 sm:ml-3">
					<p className="text-xs text-primary-700 sm:text-sm">
						<strong>Delivery Information:</strong> We deliver Monday to Saturday, 8 AM to 8 PM. Minimum order
						$25. Free delivery on orders over $50.
					</p>
				</div>
			</div>
		</div>
	);
}
