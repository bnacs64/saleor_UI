import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
	let footerLinks = null;
	let channels = null;

	try {
		footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "footer", channel },
			revalidate: 60 * 60 * 24,
		});
	} catch (error) {
		console.warn("Failed to fetch footer menu:", error);
	}

	if (process.env.SALEOR_APP_TOKEN) {
		try {
			channels = await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			});
		} catch (error) {
			console.warn("Failed to fetch channels list:", error);
		}
	}
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				{/* Main footer content */}
				<div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div>
						<div className="mb-4 flex items-center">
							<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
								<span className="text-lg font-bold text-white">🛒</span>
							</div>
							<span className="text-xl font-bold text-white">FreshMart</span>
						</div>
						<p className="mb-4 text-sm text-gray-300">
							Your trusted online grocery store delivering fresh produce and essentials to your doorstep.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-400 transition-colors hover:text-white">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
								</svg>
							</a>
							<a href="#" className="text-gray-400 transition-colors hover:text-white">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
								</svg>
							</a>
							<a href="#" className="text-gray-400 transition-colors hover:text-white">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Delivery Information */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Delivery Info</h3>
						<ul className="space-y-3 text-sm text-gray-300">
							<li className="flex items-center">
								<svg
									className="mr-2 h-4 w-4 text-primary-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Monday - Saturday: 8 AM - 8 PM
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-4 w-4 text-primary-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								Free delivery over $50
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-4 w-4 text-primary-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								Same-day delivery available
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-4 w-4 text-primary-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
									/>
								</svg>
								Minimum order: $25
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Customer Service</h3>
						<ul className="space-y-3 text-sm text-gray-300">
							<li>
								<LinkWithChannel href="/contact" className="transition-colors hover:text-white">
									Contact Us
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel href="/faq" className="transition-colors hover:text-white">
									FAQ
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel href="/returns" className="transition-colors hover:text-white">
									Returns & Refunds
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel href="/track-order" className="transition-colors hover:text-white">
									Track Your Order
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel href="/help" className="transition-colors hover:text-white">
									Help Center
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Categories or Dynamic Menu */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-white">Shop Categories</h3>
						<ul className="space-y-3 text-sm text-gray-300">
							{footerLinks.menu?.items?.slice(0, 5).map((item) => {
								if (item.category) {
									return (
										<li key={item.id}>
											<LinkWithChannel
												href={`/categories/${item.category.slug}`}
												className="transition-colors hover:text-white"
											>
												{item.category.name}
											</LinkWithChannel>
										</li>
									);
								}
								if (item.collection) {
									return (
										<li key={item.id}>
											<LinkWithChannel
												href={`/collections/${item.collection.slug}`}
												className="transition-colors hover:text-white"
											>
												{item.collection.name}
											</LinkWithChannel>
										</li>
									);
								}
								return null;
							}) || (
								<>
									<li>
										<LinkWithChannel
											href="/categories/fresh-produce"
											className="transition-colors hover:text-white"
										>
											Fresh Produce
										</LinkWithChannel>
									</li>
									<li>
										<LinkWithChannel
											href="/categories/dairy-eggs"
											className="transition-colors hover:text-white"
										>
											Dairy & Eggs
										</LinkWithChannel>
									</li>
									<li>
										<LinkWithChannel
											href="/categories/meat-seafood"
											className="transition-colors hover:text-white"
										>
											Meat & Seafood
										</LinkWithChannel>
									</li>
									<li>
										<LinkWithChannel href="/categories/pantry" className="transition-colors hover:text-white">
											Pantry Essentials
										</LinkWithChannel>
									</li>
									<li>
										<LinkWithChannel
											href="/categories/beverages"
											className="transition-colors hover:text-white"
										>
											Beverages
										</LinkWithChannel>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>

				{/* Newsletter signup */}
				<div className="border-t border-gray-800 py-8">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div>
							<h3 className="mb-2 text-lg font-semibold text-white">Stay Updated</h3>
							<p className="text-sm text-gray-300">Get the latest deals and fresh product updates</p>
						</div>
						<div className="flex w-full max-w-md">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 rounded-l-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							<button className="rounded-r-md bg-primary-600 px-6 py-2 text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
								Subscribe
							</button>
						</div>
					</div>
				</div>

				{/* Bottom footer */}
				<div className="border-t border-gray-800 py-6">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
							<p className="text-sm text-gray-400">&copy; {currentYear} FreshMart. All rights reserved.</p>
							<div className="flex space-x-4 text-sm text-gray-400">
								<LinkWithChannel href="/privacy" className="transition-colors hover:text-white">
									Privacy Policy
								</LinkWithChannel>
								<LinkWithChannel href="/terms" className="transition-colors hover:text-white">
									Terms of Service
								</LinkWithChannel>
								<LinkWithChannel href="/cookies" className="transition-colors hover:text-white">
									Cookie Policy
								</LinkWithChannel>
							</div>
						</div>

						{channels?.channels && (
							<div className="text-gray-400">
								<label className="flex items-center space-x-2">
									<span className="text-sm">Currency:</span>
									<ChannelSelect channels={channels.channels} />
								</label>
							</div>
						)}
					</div>

					<div className="mt-4 border-t border-gray-800 pt-4 text-center">
						<p className="flex items-center justify-center gap-2 text-sm text-gray-500">
							Powered by{" "}
							<Link
								target={"_blank"}
								href={"https://saleor.io/"}
								className="text-gray-400 transition-colors hover:text-white"
							>
								Saleor
							</Link>{" "}
							<Link
								href={"https://github.com/saleor/saleor"}
								target={"_blank"}
								className="opacity-50 transition-opacity hover:opacity-100"
							>
								<Image alt="Saleor github repository" height={16} width={16} src={"/github-mark.svg"} />
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
