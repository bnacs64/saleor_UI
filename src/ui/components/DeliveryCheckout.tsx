"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon, CreditCardIcon } from "lucide-react";
import { DeliveryTimeSlots, DeliveryAreaSelector, MinimumOrderBanner } from "./DeliveryInfo";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

interface DeliveryCheckoutProps {
	cartItems?: CartItem[];
	subtotal?: number;
}

export function DeliveryCheckout({ cartItems = [], subtotal = 0 }: DeliveryCheckoutProps) {
	const [deliveryFee] = useState(0);
	const [promoCode, setPromoCode] = useState("");
	const [promoDiscount, setPromoDiscount] = useState(0);

	const total = subtotal + deliveryFee - promoDiscount;
	const tax = total * 0.08; // 8% tax
	const finalTotal = total + tax;

	const applyPromoCode = () => {
		// Simple promo code logic
		if (promoCode.toLowerCase() === "fresh10") {
			setPromoDiscount(subtotal * 0.1); // 10% discount
		} else if (promoCode.toLowerCase() === "welcome5") {
			setPromoDiscount(5); // $5 off
		} else {
			setPromoDiscount(0);
		}
	};

	return (
		<div className="mx-auto max-w-4xl p-6">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Main Checkout Form */}
				<div className="space-y-6 lg:col-span-2">
					{/* Delivery Information */}
					<div>
						<h2 className="mb-4 text-xl font-semibold text-gray-900">Delivery Information</h2>
						<div className="space-y-4">
							<DeliveryAreaSelector />
							<DeliveryTimeSlots />
						</div>
					</div>

					{/* Customer Information */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
								<input
									type="text"
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter your first name"
								/>
							</div>
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
								<input
									type="text"
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter your last name"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
								<input
									type="email"
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter your email"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
								<input
									type="tel"
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter your phone number"
								/>
							</div>
						</div>
					</div>

					{/* Delivery Address */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<h3 className="mb-4 text-lg font-semibold text-gray-900">Delivery Address</h3>
						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Street Address</label>
								<input
									type="text"
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter your street address"
								/>
							</div>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">City</label>
									<input
										type="text"
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
										placeholder="City"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">State</label>
									<select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500">
										<option>Select State</option>
										<option>California</option>
										<option>New York</option>
										<option>Texas</option>
									</select>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">ZIP Code</label>
									<input
										type="text"
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
										placeholder="ZIP"
									/>
								</div>
							</div>
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Delivery Instructions (Optional)
								</label>
								<textarea
									rows={3}
									className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
									placeholder="Any special delivery instructions..."
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Order Summary Sidebar */}
				<div className="space-y-6">
					{/* Minimum Order Check */}
					<MinimumOrderBanner currentTotal={subtotal} />

					{/* Order Summary */}
					<div className="rounded-lg border border-gray-200 bg-white p-6">
						<div className="mb-4 flex items-center">
							<ShoppingCartIcon className="mr-2 h-5 w-5 text-primary-600" />
							<h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
						</div>

						{/* Cart Items */}
						<div className="mb-4 space-y-3">
							{cartItems.length > 0 ? (
								cartItems.map((item) => (
									<div key={item.id} className="flex items-center justify-between">
										<div className="flex items-center">
											<Image
												alt={item.name}
												src={item.image}
												width={48}
												height={48}
												className="mr-4 h-12 w-12 rounded object-cover"
											/>
											<div className="ml-3">
												<p className="text-sm font-medium text-gray-900">{item.name}</p>
												<p className="text-xs text-gray-500">Qty: {item.quantity}</p>
											</div>
										</div>
										<span className="text-sm font-medium text-gray-900">
											${(item.price * item.quantity).toFixed(2)}
										</span>
									</div>
								))
							) : (
								<p className="text-sm text-gray-500">Your cart is empty</p>
							)}
						</div>

						{/* Promo Code */}
						<div className="mb-4 border-t border-gray-200 pt-4">
							<div className="flex space-x-2">
								<input
									type="text"
									value={promoCode}
									onChange={(e) => setPromoCode(e.target.value)}
									placeholder="Promo code"
									className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
								/>
								<button
									onClick={applyPromoCode}
									className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
								>
									Apply
								</button>
							</div>
							{promoDiscount > 0 && (
								<p className="mt-2 text-sm text-green-600">
									Promo code applied! You saved ${promoDiscount.toFixed(2)}
								</p>
							)}
						</div>

						{/* Price Breakdown */}
						<div className="space-y-2 border-t border-gray-200 pt-4">
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Subtotal</span>
								<span className="text-gray-900">${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Delivery Fee</span>
								<span className="text-gray-900">
									{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}
								</span>
							</div>
							{promoDiscount > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Discount</span>
									<span className="text-green-600">-${promoDiscount.toFixed(2)}</span>
								</div>
							)}
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Tax</span>
								<span className="text-gray-900">${tax.toFixed(2)}</span>
							</div>
							<div className="border-t border-gray-200 pt-2">
								<div className="flex justify-between text-base font-semibold">
									<span className="text-gray-900">Total</span>
									<span className="text-gray-900">${finalTotal.toFixed(2)}</span>
								</div>
							</div>
						</div>

						{/* Checkout Button */}
						<button className="mt-6 flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
							<CreditCardIcon className="mr-2 h-5 w-5" />
							Proceed to Payment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
