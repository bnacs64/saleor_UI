export function AppDownload() {
	return (
		<section className="bg-gradient-to-r from-chaldal-green to-chaldal-green-dark py-12 sm:py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
					{/* Left side - Content */}
					<div className="text-center lg:text-left">
						<div className="mb-4">
							<span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
								📱 Mobile App Available
							</span>
						</div>

						<h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
							Download The FreshMart App Now!
						</h2>

						<p className="mb-6 text-lg text-white/90 sm:text-xl">
							Get <span className="font-bold text-chaldal-orange">5% off</span> on your first order through
							the FreshMart app and make your shopping experience even smoother!
						</p>

						{/* App store buttons */}
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
							{/* App Store button */}
							<a
								href="#"
								className="group inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800"
								aria-label="Download on the App Store"
							>
								<div className="mr-3">
									<svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
										<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
									</svg>
								</div>
								<div className="text-left">
									<div className="text-xs">Download on the</div>
									<div className="text-lg font-semibold">App Store</div>
								</div>
							</a>

							{/* Google Play button */}
							<a
								href="#"
								className="group inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800"
								aria-label="Get it on Google Play"
							>
								<div className="mr-3">
									<svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
										<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
									</svg>
								</div>
								<div className="text-left">
									<div className="text-xs">Get it on</div>
									<div className="text-lg font-semibold">Google Play</div>
								</div>
							</a>
						</div>

						{/* App features */}
						<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
							<div className="text-center">
								<div className="mb-2 text-2xl">⚡</div>
								<p className="text-sm font-medium text-white">Faster Checkout</p>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl">🔔</div>
								<p className="text-sm font-medium text-white">Push Notifications</p>
							</div>
							<div className="text-center">
								<div className="mb-2 text-2xl">💰</div>
								<p className="text-sm font-medium text-white">Exclusive Deals</p>
							</div>
						</div>
					</div>

					{/* Right side - App mockup */}
					<div className="relative flex justify-center lg:justify-end">
						<div className="relative">
							{/* Phone mockup */}
							<div className="relative mx-auto h-96 w-48 rounded-3xl bg-gray-900 p-2 shadow-2xl">
								<div className="h-full w-full rounded-2xl bg-white">
									{/* Phone screen content */}
									<div className="flex h-full flex-col">
										{/* Status bar */}
										<div className="flex items-center justify-between px-4 py-2 text-xs text-gray-600">
											<span>9:41</span>
											<div className="flex items-center gap-1">
												<div className="h-1 w-4 rounded-full bg-gray-300"></div>
												<div className="h-1 w-1 rounded-full bg-gray-300"></div>
												<div className="h-1 w-1 rounded-full bg-gray-300"></div>
											</div>
										</div>

										{/* App header */}
										<div className="bg-chaldal-green px-4 py-3">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<div className="flex h-6 w-6 items-center justify-center rounded bg-white">
														<span className="text-xs">🛒</span>
													</div>
													<span className="text-sm font-bold text-white">FreshMart</span>
												</div>
												<div className="h-6 w-6 rounded-full bg-white/20"></div>
											</div>
										</div>

										{/* App content */}
										<div className="flex-1 p-4">
											<div className="mb-4 h-20 rounded-lg bg-gradient-to-r from-green-100 to-green-200"></div>
											<div className="grid grid-cols-3 gap-2">
												{[1, 2, 3, 4, 5, 6].map((i) => (
													<div key={i} className="aspect-square rounded-lg bg-gray-100"></div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Floating elements */}
							<div className="absolute -right-4 -top-4 rounded-full bg-chaldal-orange p-3 shadow-lg">
								<span className="text-xl">🎁</span>
							</div>
							<div className="absolute -bottom-4 -left-4 rounded-full bg-white p-3 shadow-lg">
								<span className="text-xl">⭐</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
