import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface Category {
	id: string;
	name: string;
	slug: string;
	icon: string;
	color: string;
	description?: string;
}

const groceryCategories: Category[] = [
	{
		id: "1",
		name: "Fresh Produce",
		slug: "fresh-produce",
		icon: "🥬",
		color: "bg-green-100 text-green-800",
		description: "Fresh fruits & vegetables"
	},
	{
		id: "2",
		name: "Dairy & Eggs",
		slug: "dairy-eggs",
		icon: "🥛",
		color: "bg-blue-100 text-blue-800",
		description: "Milk, cheese, yogurt & eggs"
	},
	{
		id: "3",
		name: "Meat & Seafood",
		slug: "meat-seafood",
		icon: "🥩",
		color: "bg-red-100 text-red-800",
		description: "Fresh meat & seafood"
	},
	{
		id: "4",
		name: "Pantry Essentials",
		slug: "pantry",
		icon: "🏺",
		color: "bg-amber-100 text-amber-800",
		description: "Rice, oil, spices & more"
	},
	{
		id: "5",
		name: "Beverages",
		slug: "beverages",
		icon: "🥤",
		color: "bg-purple-100 text-purple-800",
		description: "Drinks & beverages"
	},
	{
		id: "6",
		name: "Snacks",
		slug: "snacks",
		icon: "🍿",
		color: "bg-orange-100 text-orange-800",
		description: "Chips, cookies & snacks"
	},
	{
		id: "7",
		name: "Frozen Foods",
		slug: "frozen",
		icon: "🧊",
		color: "bg-cyan-100 text-cyan-800",
		description: "Frozen vegetables & meals"
	},
	{
		id: "8",
		name: "Personal Care",
		slug: "personal-care",
		icon: "🧴",
		color: "bg-pink-100 text-pink-800",
		description: "Health & beauty products"
	},
	{
		id: "9",
		name: "Household",
		slug: "household",
		icon: "🧽",
		color: "bg-gray-100 text-gray-800",
		description: "Cleaning & household items"
	},
	{
		id: "10",
		name: "Baby Care",
		slug: "baby-care",
		icon: "👶",
		color: "bg-yellow-100 text-yellow-800",
		description: "Baby food & care products"
	},
	{
		id: "11",
		name: "Bakery",
		slug: "bakery",
		icon: "🍞",
		color: "bg-orange-100 text-orange-800",
		description: "Fresh bread & baked goods"
	},
	{
		id: "12",
		name: "International",
		slug: "international",
		icon: "🌍",
		color: "bg-indigo-100 text-indigo-800",
		description: "Global cuisine ingredients"
	}
];

export function CategoryGrid() {
	return (
		<section className="py-12 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Shop by Category
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Find everything you need organized by category
					</p>
				</div>
				
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{groceryCategories.map((category) => (
						<LinkWithChannel
							key={category.id}
							href={`/categories/${category.slug}`}
							className="group relative bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
						>
							<div className="text-center">
								<div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
									{category.icon}
								</div>
								<h3 className="text-sm font-semibold text-gray-900 mb-1">
									{category.name}
								</h3>
								<p className="text-xs text-gray-500 leading-tight">
									{category.description}
								</p>
							</div>
							<div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary-200 transition-colors duration-200" />
						</LinkWithChannel>
					))}
				</div>
				
				<div className="text-center mt-10">
					<LinkWithChannel
						href="/categories"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors duration-200"
					>
						View All Categories
						<svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
}
