"use client";

import { useState } from "react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	const [isHovered, setIsHovered] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handleQuickAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// TODO: Implement quick add to cart functionality
		console.log(`Adding ${quantity} of ${product.name} to cart`);
	};

	return (
		<li
			data-testid="ProductElement"
			className="group relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
				<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
					<div className="relative">
						{product?.thumbnail?.url && (
							<div className="aspect-square overflow-hidden bg-gray-50">
								<ProductImageWrapper
									loading={loading}
									src={product.thumbnail.url}
									alt={product.thumbnail.alt ?? ""}
									width={300}
									height={300}
									sizes="300px"
									priority={priority}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
								/>
							</div>
						)}

						{/* Quick add button overlay */}
						{isHovered && (
							<div className="absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center p-4">
								<button
									onClick={handleQuickAdd}
									className="w-full bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
								>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
									Quick Add
								</button>
							</div>
						)}
					</div>
				</LinkWithChannel>

				<div className="p-4">
					<LinkWithChannel href={`/products/${product.slug}`}>
						<div className="space-y-2">
							<div>
								<h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
									{product.name}
								</h3>
								<p className="text-xs text-gray-500 mt-1" data-testid="ProductElement_Category">
									{product.category?.name}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<p className="text-lg font-bold text-primary-600" data-testid="ProductElement_PriceRange">
										{formatMoneyRange({
											start: product?.pricing?.priceRange?.start?.gross,
											stop: product?.pricing?.priceRange?.stop?.gross,
										})}
									</p>
									{/* Unit pricing placeholder */}
									<p className="text-xs text-gray-400">per unit</p>
								</div>

								{/* Stock indicator */}
								<div className="flex items-center">
									<div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
									<span className="text-xs text-green-600">In Stock</span>
								</div>
							</div>
						</div>
					</LinkWithChannel>

					{/* Quantity selector for quick add */}
					{isHovered && (
						<div className="mt-3 flex items-center justify-between">
							<div className="flex items-center border border-gray-300 rounded-md">
								<button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setQuantity(Math.max(1, quantity - 1));
									}}
									className="px-2 py-1 text-gray-600 hover:text-gray-800"
								>
									-
								</button>
								<span className="px-3 py-1 text-sm font-medium">{quantity}</span>
								<button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setQuantity(quantity + 1);
									}}
									className="px-2 py-1 text-gray-600 hover:text-gray-800"
								>
									+
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}
