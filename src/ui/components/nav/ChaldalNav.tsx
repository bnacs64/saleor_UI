import { ShoppingCartIcon, HeartIcon, TagIcon, SparklesIcon, TruckIcon, PhoneIcon } from "lucide-react";

import { executeGraphQL } from "@/lib/graphql";
import { CategoriesListDocument } from "@/gql/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export async function ChaldalNav({ channel }: { channel: string }) {
	// Fetch categories from Saleor
	const { categories } = await executeGraphQL(CategoriesListDocument, {
		variables: { first: 8, channel },
		revalidate: 60 * 60, // Cache for 1 hour
	});

	const categoryItems =
		categories?.edges?.slice(0, 6).map(({ node }) => ({
			name: node.name,
			href: `/categories/${node.slug}`,
			icon: getIconForCategory(node.name),
		})) || [];

	// Special navigation items (Chaldal-style)
	const specialItems = [
		{
			name: "Offers",
			href: "/offers",
			icon: TagIcon,
			highlight: true,
		},
		{
			name: "Favorites",
			href: "/favorites",
			icon: HeartIcon,
		},
	];

	return (
		<div className="border-b border-gray-200 bg-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-12 items-center justify-between">
					{/* Service tabs */}
					<div className="flex items-center space-x-6">
						<LinkWithChannel
							href="/grocery"
							className="flex items-center space-x-2 border-b-2 border-chaldal-green px-3 py-2 text-sm font-medium text-chaldal-green"
						>
							<ShoppingCartIcon className="h-4 w-4" />
							<span>Grocery</span>
						</LinkWithChannel>
						<LinkWithChannel
							href="/pharmacy"
							className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-chaldal-gray-medium transition-colors hover:text-chaldal-green"
						>
							<PhoneIcon className="h-4 w-4" />
							<span>Pharmacy</span>
						</LinkWithChannel>
						<LinkWithChannel
							href="/fresh"
							className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-chaldal-gray-medium transition-colors hover:text-chaldal-green"
						>
							<SparklesIcon className="h-4 w-4" />
							<span>Fresh</span>
						</LinkWithChannel>
					</div>

					{/* Category navigation */}
					<div className="hidden items-center space-x-6 lg:flex">
						{specialItems.map((item) => {
							const IconComponent = item.icon;
							return (
								<LinkWithChannel
									key={item.name}
									href={item.href}
									className={`flex items-center space-x-1 px-2 py-1 text-sm font-medium transition-colors ${
										item.highlight
											? "text-chaldal-orange hover:text-orange-600"
											: "text-chaldal-gray-medium hover:text-chaldal-green"
									}`}
								>
									<IconComponent className="h-4 w-4" />
									<span>{item.name}</span>
								</LinkWithChannel>
							);
						})}

						{categoryItems.map((item) => {
							const IconComponent = item.icon;
							return (
								<LinkWithChannel
									key={item.name}
									href={item.href}
									className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-chaldal-gray-medium transition-colors hover:text-chaldal-green"
								>
									<IconComponent className="h-4 w-4" />
									<span>{item.name}</span>
								</LinkWithChannel>
							);
						})}
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<button className="p-2 text-chaldal-gray-medium hover:text-chaldal-green">
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Helper function to assign icons to categories
function getIconForCategory(categoryName: string) {
	const name = categoryName.toLowerCase();

	if (name.includes("fruit") || name.includes("vegetable")) {
		return SparklesIcon;
	}
	if (name.includes("meat") || name.includes("fish")) {
		return TruckIcon;
	}
	if (name.includes("dairy") || name.includes("milk")) {
		return ShoppingCartIcon;
	}
	if (name.includes("beverage") || name.includes("drink")) {
		return PhoneIcon;
	}

	// Default icon
	return ShoppingCartIcon;
}
