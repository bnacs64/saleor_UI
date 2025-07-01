"use client";

import { useState } from "react";
import { ClockIcon, MapPinIcon, TruckIcon, CheckCircleIcon } from "lucide-react";

interface DeliverySlot {
	id: string;
	time: string;
	available: boolean;
	price: number;
}

interface DeliveryArea {
	id: string;
	name: string;
	available: boolean;
	deliveryFee: number;
	minOrder: number;
}

const deliverySlots: DeliverySlot[] = [
	{ id: "morning", time: "8:00 AM - 12:00 PM", available: true, price: 0 },
	{ id: "afternoon", time: "12:00 PM - 4:00 PM", available: true, price: 0 },
	{ id: "evening", time: "4:00 PM - 8:00 PM", available: false, price: 0 },
	{ id: "express", time: "Express (2 hours)", available: true, price: 5.99 },
];

const deliveryAreas: DeliveryArea[] = [
	{ id: "downtown", name: "Downtown", available: true, deliveryFee: 0, minOrder: 25 },
	{ id: "midtown", name: "Midtown", available: true, deliveryFee: 2.99, minOrder: 30 },
	{ id: "uptown", name: "Uptown", available: true, deliveryFee: 4.99, minOrder: 35 },
	{ id: "suburbs", name: "Suburbs", available: false, deliveryFee: 7.99, minOrder: 50 },
];

export function DeliveryTimeSlots() {
	const [selectedSlot, setSelectedSlot] = useState<string>("morning");

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6">
			<div className="mb-4 flex items-center">
				<ClockIcon className="mr-2 h-5 w-5 text-primary-600" />
				<h3 className="text-lg font-semibold text-gray-900">Delivery Time</h3>
			</div>

			<div className="space-y-3">
				{deliverySlots.map((slot) => (
					<label
						key={slot.id}
						className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
							selectedSlot === slot.id
								? "border-primary-500 bg-primary-50"
								: "border-gray-200 hover:border-gray-300"
						} ${!slot.available ? "cursor-not-allowed opacity-50" : ""}`}
					>
						<div className="flex items-center">
							<input
								type="radio"
								name="deliverySlot"
								value={slot.id}
								checked={selectedSlot === slot.id}
								onChange={(e) => setSelectedSlot(e.target.value)}
								disabled={!slot.available}
								className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
							/>
							<div className="ml-3">
								<span className="text-sm font-medium text-gray-900">{slot.time}</span>
								{!slot.available && <span className="block text-xs text-red-500">Not available</span>}
							</div>
						</div>
						<div className="text-right">
							{slot.price > 0 ? (
								<span className="text-sm font-medium text-gray-900">${slot.price}</span>
							) : (
								<span className="text-sm font-medium text-green-600">Free</span>
							)}
						</div>
					</label>
				))}
			</div>
		</div>
	);
}

export function DeliveryAreaSelector() {
	const [selectedArea, setSelectedArea] = useState<string>("downtown");

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6">
			<div className="mb-4 flex items-center">
				<MapPinIcon className="mr-2 h-5 w-5 text-primary-600" />
				<h3 className="text-lg font-semibold text-gray-900">Delivery Area</h3>
			</div>

			<div className="space-y-3">
				{deliveryAreas.map((area) => (
					<label
						key={area.id}
						className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
							selectedArea === area.id
								? "border-primary-500 bg-primary-50"
								: "border-gray-200 hover:border-gray-300"
						} ${!area.available ? "cursor-not-allowed opacity-50" : ""}`}
					>
						<div className="flex items-center">
							<input
								type="radio"
								name="deliveryArea"
								value={area.id}
								checked={selectedArea === area.id}
								onChange={(e) => setSelectedArea(e.target.value)}
								disabled={!area.available}
								className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
							/>
							<div className="ml-3">
								<span className="text-sm font-medium text-gray-900">{area.name}</span>
								{!area.available && <span className="block text-xs text-red-500">Not available</span>}
								<span className="block text-xs text-gray-500">Min order: ${area.minOrder}</span>
							</div>
						</div>
						<div className="text-right">
							{area.deliveryFee > 0 ? (
								<span className="text-sm font-medium text-gray-900">${area.deliveryFee}</span>
							) : (
								<span className="text-sm font-medium text-green-600">Free</span>
							)}
						</div>
					</label>
				))}
			</div>
		</div>
	);
}

export function DeliveryInfoSummary() {
	return (
		<div className="rounded-lg border border-primary-200 bg-gradient-to-r from-primary-50 to-green-50 p-6">
			<div className="mb-4 flex items-center">
				<TruckIcon className="mr-2 h-6 w-6 text-primary-600" />
				<h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex items-start">
					<CheckCircleIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
					<div>
						<h4 className="text-sm font-medium text-gray-900">Same-Day Delivery</h4>
						<p className="text-sm text-gray-600">Order by 6 PM for same-day delivery</p>
					</div>
				</div>

				<div className="flex items-start">
					<CheckCircleIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
					<div>
						<h4 className="text-sm font-medium text-gray-900">Free Delivery</h4>
						<p className="text-sm text-gray-600">On orders over $50</p>
					</div>
				</div>

				<div className="flex items-start">
					<CheckCircleIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
					<div>
						<h4 className="text-sm font-medium text-gray-900">Fresh Guarantee</h4>
						<p className="text-sm text-gray-600">100% satisfaction guaranteed</p>
					</div>
				</div>

				<div className="flex items-start">
					<CheckCircleIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
					<div>
						<h4 className="text-sm font-medium text-gray-900">Contact-Free</h4>
						<p className="text-sm text-gray-600">Safe delivery to your doorstep</p>
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-lg border border-primary-200 bg-white p-4">
				<h4 className="mb-2 text-sm font-medium text-gray-900">Delivery Schedule</h4>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="font-medium text-gray-700">Monday - Friday:</span>
						<span className="block text-gray-600">8:00 AM - 8:00 PM</span>
					</div>
					<div>
						<span className="font-medium text-gray-700">Saturday - Sunday:</span>
						<span className="block text-gray-600">9:00 AM - 6:00 PM</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export function MinimumOrderBanner({ currentTotal = 0 }: { currentTotal?: number }) {
	const minimumOrder = 25;
	const remaining = Math.max(0, minimumOrder - currentTotal);
	const isEligible = currentTotal >= minimumOrder;

	if (isEligible) {
		return (
			<div className="rounded-lg border border-green-200 bg-green-50 p-4">
				<div className="flex items-center">
					<CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
					<span className="text-sm font-medium text-green-800">Great! You qualify for delivery.</span>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<TruckIcon className="mr-2 h-5 w-5 text-orange-500" />
					<span className="text-sm font-medium text-orange-800">
						Add ${remaining.toFixed(2)} more for delivery
					</span>
				</div>
				<div className="text-xs text-orange-600">Minimum order: ${minimumOrder}</div>
			</div>
			<div className="mt-2">
				<div className="h-2 rounded-full bg-orange-200">
					<div
						className="h-2 rounded-full bg-orange-500 transition-all duration-300"
						style={{ width: `${Math.min(100, (currentTotal / minimumOrder) * 100)}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
