import { notFound, redirect } from "next/navigation";
import { OrderDirection, ProductOrderField, SearchProductsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { SearchFiltersContainer } from "@/ui/components/SearchFiltersContainer";
import { ProductsPerPage } from "@/app/config";

export const metadata = {
	title: "Search Groceries · FreshMart",
	description: "Search for fresh produce, pantry essentials, and household items at FreshMart",
};

export default async function Page(props: {
	searchParams: Promise<Record<"query" | "cursor", string | string[] | undefined>>;
	params: Promise<{ channel: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;
	const searchValue = searchParams.query;

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find((v) => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		redirect(`/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	let products = null;
	try {
		const result = await executeGraphQL(SearchProductsDocument, {
			variables: {
				first: ProductsPerPage,
				search: searchValue,
				after: cursor,
				sortBy: ProductOrderField.Rating,
				sortDirection: OrderDirection.Asc,
				channel: params.channel,
			},
			revalidate: 60,
		});
		products = result.products;
	} catch (error) {
		console.warn("Failed to search products:", error);
		// products remains null
	}

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		query: searchValue,
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			{products.totalCount && products.totalCount > 0 ? (
				<div>
					{/* Search Results Header */}
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							Search results for &quot;{searchValue}&quot;
						</h1>
						<p className="mt-2 text-sm text-gray-600">
							Found {products.totalCount} {products.totalCount === 1 ? "product" : "products"}
						</p>
					</div>

					{/* Main Content with Sidebar */}
					<div className="lg:grid lg:grid-cols-4 lg:gap-8">
						{/* Filters Sidebar */}
						<div className="hidden lg:block">
							<div className="sticky top-8">
								<SearchFiltersContainer channel={params.channel} />
							</div>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-3">
							{/* Mobile Filters Button */}
							<div className="mb-6 lg:hidden">
								<button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
									<svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
										/>
									</svg>
									Filters
								</button>
							</div>

							{/* Quick Filters */}
							<div className="mb-8 flex flex-wrap gap-2">
								<span className="text-sm font-medium text-gray-700">Quick filters:</span>
								<button className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 transition-colors hover:bg-primary-200">
									Fresh Produce
								</button>
								<button className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 transition-colors hover:bg-primary-200">
									Organic
								</button>
								<button className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 transition-colors hover:bg-primary-200">
									Dairy & Eggs
								</button>
								<button className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 transition-colors hover:bg-primary-200">
									Pantry Essentials
								</button>
								<button className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 transition-colors hover:bg-primary-200">
									Beverages
								</button>
							</div>

							{/* Sort Options */}
							<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center space-x-4">
									<label className="text-sm font-medium text-gray-700">Sort by:</label>
									<select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-primary-500 focus:ring-primary-500">
										<option>Relevance</option>
										<option>Price: Low to High</option>
										<option>Price: High to Low</option>
										<option>Name: A to Z</option>
										<option>Newest First</option>
									</select>
								</div>
								<div className="text-sm text-gray-500">
									Showing {products.edges.length} of {products.totalCount} products
								</div>
							</div>

							{/* Products Grid */}
							<ProductList products={products.edges.map((e) => e.node)} />

							{/* Pagination */}
							<div className="mt-12">
								<Pagination
									pageInfo={{
										...products.pageInfo,
										basePathname: `/search`,
										urlSearchParams: newSearchParams,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="py-12 text-center">
					<div className="mx-auto max-w-md">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<h1 className="mt-4 text-xl font-semibold text-gray-900">No products found</h1>
						<p className="mt-2 text-gray-600">
							We couldn&apos;t find any products matching &quot;{searchValue}&quot;. Try searching for
							something else.
						</p>
						<div className="mt-6">
							<h3 className="mb-3 text-sm font-medium text-gray-900">Popular searches:</h3>
							<div className="flex flex-wrap justify-center gap-2">
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
									Fresh fruits
								</span>
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
									Vegetables
								</span>
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
									Dairy products
								</span>
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
									Bread
								</span>
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
									Snacks
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
