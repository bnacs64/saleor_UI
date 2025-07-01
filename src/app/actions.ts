"use server";

import { redirect } from "next/navigation";

export async function logout() {
	"use server";
	// For now, we'll redirect to a logout page that clears localStorage
	// In a full implementation, you'd clear server-side cookies here
	redirect("/logout");
}
