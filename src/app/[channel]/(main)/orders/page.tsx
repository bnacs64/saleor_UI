"use client";

import { useState, useEffect } from "react";
import { OrderListItem } from "@/ui/components/OrderListItem";
import { ProtectedRoute } from "@/ui/components/ProtectedRoute";

interface User {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
}

interface Order {
	id: string;
	number: string;
	created: string;
	status: string;
	total: {
		gross: {
			amount: number;
			currency: string;
		};
	};
}

function OrdersContent() {
	const [user, setUser] = useState<User | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUserAndOrders = async () => {
			try {
				const token = localStorage.getItem("saleor-auth-token");
				if (!token) {
					setIsLoading(false);
					return;
				}

				// Fetch current user
				const userQuery = `
					query CurrentUser {
						me {
							id
							email
							firstName
							lastName
						}
					}
				`;

				const userResponse = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL!, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						query: userQuery,
					}),
				});

				const userResult = await userResponse.json();

				if (userResult.data?.me) {
					setUser(userResult.data.me);

					// Fetch user orders
					const ordersQuery = `
						query CurrentUserOrders {
							me {
								orders(first: 20) {
									edges {
										node {
											id
											number
											created
											status
											total {
												gross {
													amount
													currency
												}
											}
										}
									}
								}
							}
						}
					`;

					const ordersResponse = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL!, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							query: ordersQuery,
						}),
					});

					const ordersResult = await ordersResponse.json();
					const ordersList = ordersResult.data?.me?.orders?.edges?.map((edge: any) => edge.node) || [];
					setOrders(ordersList);
				}
			} catch (error) {
				console.error("Failed to fetch user orders:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserAndOrders();
	}, []);

	if (isLoading) {
		return (
			<div className="mx-auto max-w-7xl p-8">
				<div className="flex items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
					<span className="ml-2">Loading your orders...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl p-8">
			<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
				{user?.firstName ? user.firstName : user?.email}&rsquo;s orders
			</h1>

			{orders.length === 0 ? (
				<div className="mt-8">
					<div className="rounded border border-neutral-100 bg-white p-4">
						<div className="flex items-center">No orders found</div>
					</div>
				</div>
			) : (
				<ul className="mt-8 space-y-6">
					{orders.map((order) => {
						return <OrderListItem order={order} key={order.id} />;
					})}
				</ul>
			)}
		</div>
	);
}

export default function OrderPage() {
	return (
		<ProtectedRoute>
			<OrdersContent />
		</ProtectedRoute>
	);
}
