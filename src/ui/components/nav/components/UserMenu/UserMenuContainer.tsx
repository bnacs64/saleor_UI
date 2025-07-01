import { UserIcon, UserPlus } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export async function UserMenuContainer() {
	let user = null;

	try {
		const result = await executeGraphQL(CurrentUserDocument, {
			cache: "no-cache",
		});
		user = result.me;
	} catch (error) {
		// Log error for debugging but continue with unauthenticated state
		console.warn("Failed to fetch current user:", error);
		// user remains null, will show sign in/up buttons
	}

	if (user) {
		return <UserMenu user={user} />;
	} else {
		return (
			<div className="flex items-center space-x-2">
				{/* Sign In Link */}
				<LinkWithChannel
					href="/login"
					className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-chaldal-gray-dark transition-colors hover:bg-chaldal-gray-light"
				>
					<UserIcon className="h-4 w-4" aria-hidden="true" />
					<span className="hidden sm:inline">Sign In</span>
				</LinkWithChannel>

				{/* Sign Up Link */}
				<LinkWithChannel
					href="/signup"
					className="flex items-center space-x-1 rounded-lg bg-chaldal-green px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-chaldal-green-dark"
				>
					<UserPlus className="h-4 w-4" aria-hidden="true" />
					<span className="hidden sm:inline">Sign Up</span>
				</LinkWithChannel>
			</div>
		);
	}
}
