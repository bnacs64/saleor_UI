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
		description: "Fresh fruits & vegetables",
	},
	{
		id: "2",
		name: "Dairy & Eggs",
		slug: "dairy-eggs",
		icon: "🥛",
		color: "bg-blue-100 text-blue-800",
		description: "Milk, cheese, yogurt & eggs",
	},
	{
		id: "3",
		name: "Meat & Seafood",
		slug: "meat-seafood",
		icon: "🥩",
		color: "bg-red-100 text-red-800",
		description: "Fresh meat & seafood",
	},
	{
		id: "4",
		name: "Pantry Essentials",
		slug: "pantry",
		icon: "🏺",
		color: "bg-amber-100 text-amber-800",
		description: "Rice, oil, spices & more",
	},
	{
		id: "5",
		name: "Beverages",
		slug: "beverages",
		icon: "🥤",
		color: "bg-purple-100 text-purple-800",
		description: "Drinks & beverages",
	},
	{
		id: "6",
		name: "Snacks",
		slug: "snacks",
		icon: "🍿",
		color: "bg-orange-100 text-orange-800",
		description: "Chips, cookies & snacks",
	},
	{
		id: "7",
		name: "Frozen Foods",
		slug: "frozen",
		icon: "🧊",
		color: "bg-cyan-100 text-cyan-800",
		description: "Frozen vegetables & meals",
	},
	{
		id: "8",
		name: "Personal Care",
		slug: "personal-care",
		icon: "🧴",
		color: "bg-pink-100 text-pink-800",
		description: "Health & beauty products",
	},
	{
		id: "9",
		name: "Household",
		slug: "household",
		icon: "🧽",
		color: "bg-gray-100 text-gray-800",
		description: "Cleaning & household items",
	},
	{
		id: "10",
		name: "Baby Care",
		slug: "baby-care",
		icon: "👶",
		color: "bg-yellow-100 text-yellow-800",
		description: "Baby food & care products",
	},
	{
		id: "11",
		name: "Bakery",
		slug: "bakery",
		icon: "🍞",
		color: "bg-orange-100 text-orange-800",
		description: "Fresh bread & baked goods",
	},
	{
		id: "12",
		name: "International",
		slug: "international",
		icon: "🌍",
		color: "bg-indigo-100 text-indigo-800",
		description: "Global cuisine ingredients",
	},
];

export function CategoryGrid() {
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
					{groceryCategories.map((category) => (
						<LinkWithChannel
							key={category.id}
							href={`/categories/${category.slug}`}
							className="group relative rounded-lg bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6"
						>
							<div className="text-center">
								<div className="mb-2 text-2xl transition-transform duration-200 group-hover:scale-110 sm:mb-3 sm:text-4xl">
									{category.icon}
								</div>
								<h3 className="mb-1 line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
									{category.name}
								</h3>
								<p className="line-clamp-2 hidden text-xs leading-tight text-gray-500 sm:block">
									{category.description}
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
