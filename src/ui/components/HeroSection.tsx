import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export function HeroSection() {
	return (
		<div className="relative bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-primary-600 mix-blend-multiply" />
			</div>
			<div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<div className="text-center lg:text-left">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
							Fresh Groceries
							<span className="block text-accent-300">Delivered Fast</span>
						</h1>
						<p className="mt-6 text-xl text-primary-100 max-w-3xl">
							Get fresh produce, pantry essentials, and household items delivered to your doorstep. 
							Same-day delivery available in your area.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<LinkWithChannel
								href="/products"
								className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-200"
							>
								Shop Now
							</LinkWithChannel>
							<LinkWithChannel
								href="/categories"
								className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-700 transition-colors duration-200"
							>
								Browse Categories
							</LinkWithChannel>
						</div>
						<div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-primary-100">
							<div className="flex items-center">
								<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
								</svg>
								<span className="text-sm">Free delivery over $50</span>
							</div>
							<div className="flex items-center">
								<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
								</svg>
								<span className="text-sm">Same-day delivery</span>
							</div>
						</div>
					</div>
					<div className="relative">
						<div className="relative mx-auto w-full max-w-lg">
							<div className="relative rounded-lg shadow-lg overflow-hidden">
								<div className="bg-white p-8 rounded-lg">
									<div className="grid grid-cols-2 gap-4">
										<div className="text-center">
											<div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-3">
												<svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
												</svg>
											</div>
											<h3 className="text-sm font-medium text-gray-900">Fresh Produce</h3>
										</div>
										<div className="text-center">
											<div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center mb-3">
												<svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
												</svg>
											</div>
											<h3 className="text-sm font-medium text-gray-900">Dairy & Eggs</h3>
										</div>
										<div className="text-center">
											<div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center mb-3">
												<svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
												</svg>
											</div>
											<h3 className="text-sm font-medium text-gray-900">Pantry</h3>
										</div>
										<div className="text-center">
											<div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-3">
												<svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
												</svg>
											</div>
											<h3 className="text-sm font-medium text-gray-900">Beverages</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
