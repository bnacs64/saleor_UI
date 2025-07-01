import { LinkWithChannel } from "../atoms/LinkWithChannel";

export function HeroSection() {
	return (
		<div className="relative overflow-hidden bg-gradient-to-r from-chaldal-green to-chaldal-green-dark">
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0 bg-white/5"
					style={{
						backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
						backgroundSize: "20px 20px",
					}}
				/>
			</div>

			<div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
					{/* Left side - Main content */}
					<div className="text-center lg:text-left">
						<div className="mb-4">
							<span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
								🎉 Grand Opening Special
							</span>
						</div>
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
							Fresh Groceries
							<span className="block text-chaldal-orange">Delivered in 1 Hour</span>
						</h1>
						<p className="mt-4 max-w-3xl text-lg text-white/90 sm:text-xl">
							Get fresh produce, daily essentials, and household items delivered to your doorstep. Pay after
							receiving your order with our trusted service.
						</p>

						{/* CTA Buttons */}
						<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
							<LinkWithChannel
								href="/products"
								className="btn-chaldal-secondary inline-flex transform items-center justify-center text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
							>
								🛒 Start Shopping
							</LinkWithChannel>
							<LinkWithChannel
								href="/offers"
								className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-white hover:text-chaldal-green"
							>
								View Offers
							</LinkWithChannel>
						</div>
						{/* Chaldal-style Service Highlights */}
						<div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
							<div className="flex flex-col items-center text-center">
								<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
									<span className="text-2xl">📦</span>
								</div>
								<span className="text-sm font-medium text-white">+15000</span>
								<span className="text-xs text-white/80">Products</span>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
									<span className="text-2xl">💰</span>
								</div>
								<span className="text-sm font-medium text-white">Pay After</span>
								<span className="text-xs text-white/80">Receiving</span>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
									<span className="text-2xl">⚡</span>
								</div>
								<span className="text-sm font-medium text-white">1 Hour</span>
								<span className="text-xs text-white/80">Delivery</span>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
									<span className="text-2xl">💸</span>
								</div>
								<span className="text-sm font-medium text-white">Save Money</span>
								<span className="text-xs text-white/80">Offers</span>
							</div>
						</div>
					</div>

					{/* Right side - Visual showcase */}
					<div className="relative">
						<div className="relative mx-auto w-full max-w-lg">
							{/* Main showcase card */}
							<div className="card-chaldal relative overflow-hidden bg-white p-6 shadow-2xl">
								<div className="text-center">
									<div className="mb-4">
										<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-chaldal-green">
											<span className="text-3xl">🛒</span>
										</div>
									</div>
									<h3 className="mb-2 text-xl font-bold text-chaldal-gray-dark">FreshMart Delivery</h3>
									<p className="mb-4 text-sm text-chaldal-gray-medium">Your trusted grocery partner</p>

									{/* Quick stats */}
									<div className="grid grid-cols-2 gap-4 text-center">
										<div className="rounded-lg bg-green-50 p-3">
											<div className="text-lg font-bold text-chaldal-green">50K+</div>
											<div className="text-xs text-chaldal-gray-medium">Happy Customers</div>
										</div>
										<div className="rounded-lg bg-orange-50 p-3">
											<div className="text-lg font-bold text-chaldal-orange">99%</div>
											<div className="text-xs text-chaldal-gray-medium">On-time Delivery</div>
										</div>
									</div>
								</div>

								{/* Floating elements */}
								<div className="absolute -right-2 -top-2 rounded-full bg-chaldal-orange px-2 py-1 text-xs font-bold text-white">
									NEW
								</div>
							</div>

							{/* Floating service badges */}
							<div className="absolute -left-4 top-1/2 -translate-y-1/2 transform">
								<div className="rounded-full bg-white p-3 shadow-lg">
									<span className="text-2xl">⚡</span>
								</div>
							</div>
							<div className="absolute -right-4 top-1/4">
								<div className="rounded-full bg-white p-3 shadow-lg">
									<span className="text-2xl">🎯</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
