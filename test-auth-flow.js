const SALEOR_API_URL = "https://api.4restaurants.store/graphql/";

// Test complete authentication flow
async function testCompleteAuthFlow() {
	console.log("🧪 Testing Complete Authentication Flow...");
	
	const testEmail = `test${Date.now()}@example.com`;
	const testPassword = "testpassword123";
	
	try {
		// Step 1: Register a new user
		console.log("1. Testing user registration...");
		const registerMutation = `
			mutation userRegister($input: AccountRegisterInput!) {
				accountRegister(input: $input) {
					errors {
						message
						field
						code
					}
					user {
						id
						email
						firstName
						lastName
					}
				}
			}
		`;

		const registerVariables = {
			input: {
				email: testEmail,
				password: testPassword,
				firstName: "Test",
				lastName: "User",
				channel: "default-channel",
				redirectUrl: "http://localhost:3067/account-confirm"
			}
		};

		const registerResponse = await fetch(SALEOR_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: registerMutation,
				variables: registerVariables,
			}),
		});

		const registerResult = await registerResponse.json();
		
		if (registerResult.data?.accountRegister?.errors?.length > 0) {
			console.log("❌ Registration failed:", registerResult.data.accountRegister.errors);
			return false;
		}

		if (registerResult.data?.accountRegister?.user) {
			console.log("✅ Registration successful:", registerResult.data.accountRegister.user.email);
		} else {
			console.log("❌ Registration failed - no user returned");
			return false;
		}

		// Step 2: Login with the new user
		console.log("2. Testing user login...");
		const loginMutation = `
			mutation tokenCreate($email: String!, $password: String!) {
				tokenCreate(email: $email, password: $password) {
					token
					refreshToken
					errors {
						field
						message
						code
					}
					user {
						id
						email
						firstName
						lastName
					}
				}
			}
		`;

		const loginVariables = {
			email: testEmail,
			password: testPassword,
		};

		const loginResponse = await fetch(SALEOR_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: loginMutation,
				variables: loginVariables,
			}),
		});

		const loginResult = await loginResponse.json();
		
		if (loginResult.data?.tokenCreate?.errors?.length > 0) {
			console.log("❌ Login failed:", loginResult.data.tokenCreate.errors);
			return false;
		}

		if (loginResult.data?.tokenCreate?.token) {
			console.log("✅ Login successful for:", loginResult.data.tokenCreate.user.email);
			
			// Step 3: Test authenticated query
			console.log("3. Testing authenticated query...");
			const meQuery = `
				query CurrentUser {
					me {
						id
						email
						firstName
						lastName
					}
				}
			`;

			const meResponse = await fetch(SALEOR_API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${loginResult.data.tokenCreate.token}`
				},
				body: JSON.stringify({
					query: meQuery,
				}),
			});

			const meResult = await meResponse.json();
			
			if (meResult.data?.me) {
				console.log("✅ Authenticated query successful:", meResult.data.me.email);
				console.log("🎉 Complete authentication flow test passed!");
				return true;
			} else {
				console.log("❌ Authenticated query failed");
				return false;
			}
		} else {
			console.log("❌ Login failed - no token returned");
			return false;
		}

	} catch (error) {
		console.log("❌ Authentication flow failed:", error.message);
		return false;
	}
}

// Test invalid credentials
async function testInvalidCredentials() {
	console.log("\n🧪 Testing Invalid Credentials...");
	
	const loginMutation = `
		mutation tokenCreate($email: String!, $password: String!) {
			tokenCreate(email: $email, password: $password) {
				token
				refreshToken
				errors {
					field
					message
					code
				}
			}
		}
	`;

	const loginVariables = {
		email: "invalid@example.com",
		password: "wrongpassword",
	};

	try {
		const loginResponse = await fetch(SALEOR_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: loginMutation,
				variables: loginVariables,
			}),
		});

		const loginResult = await loginResponse.json();
		
		if (loginResult.data?.tokenCreate?.errors?.length > 0) {
			console.log("✅ Invalid credentials properly rejected:", loginResult.data.tokenCreate.errors[0].message);
			return true;
		} else if (!loginResult.data?.tokenCreate?.token) {
			console.log("✅ Invalid credentials properly rejected (no token returned)");
			return true;
		} else {
			console.log("❌ Invalid credentials were accepted - this is a security issue!");
			return false;
		}
	} catch (error) {
		console.log("❌ Error testing invalid credentials:", error.message);
		return false;
	}
}

// Run all tests
async function runAllTests() {
	console.log("🚀 Starting Authentication Flow Tests\n");
	
	const test1 = await testCompleteAuthFlow();
	const test2 = await testInvalidCredentials();
	
	console.log("\n📊 Test Results:");
	console.log(`Complete Auth Flow: ${test1 ? '✅ PASS' : '❌ FAIL'}`);
	console.log(`Invalid Credentials: ${test2 ? '✅ PASS' : '❌ FAIL'}`);
	
	if (test1 && test2) {
		console.log("\n🎉 All authentication tests passed!");
	} else {
		console.log("\n❌ Some authentication tests failed!");
	}
}

runAllTests().catch(console.error);
