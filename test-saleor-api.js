// Test script to verify Saleor API compatibility
const API_URL = "https://api.4restaurants.store/graphql/";

async function testQuery(name, query) {
	console.log(`\n🧪 Testing: ${name}`);
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query }),
		});

		const result = await response.json();

		if (result.errors) {
			console.log(`❌ ${name} failed:`);
			result.errors.forEach((error) => console.log(`   - ${error.message}`));
			return false;
		} else {
			console.log(`✅ ${name} passed`);
			return true;
		}
	} catch (error) {
		console.log(`❌ ${name} error: ${error.message}`);
		return false;
	}
}

async function runTests() {
	console.log("🚀 Testing Saleor API Compatibility\n");

	const tests = [
		{
			name: "Products Query",
			query: `query {
        products(first: 1, channel: "default-channel") {
          edges {
            node {
              id
              name
              slug
              pricing {
                priceRange {
                  start {
                    gross {
                      amount
                      currency
                    }
                  }
                }
              }
              thumbnail(size: 1024, format: WEBP) {
                url
                alt
              }
              category {
                id
                name
              }
            }
          }
        }
      }`,
		},
		{
			name: "Collections Query",
			query: `query {
        collections(first: 1, channel: "default-channel") {
          edges {
            node {
              id
              name
              slug
              products(first: 1) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }`,
		},
		{
			name: "Categories Query",
			query: `query {
        categories(first: 1) {
          edges {
            node {
              id
              name
              slug
              products(first: 1, channel: "default-channel") {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }`,
		},
		{
			name: "Search Products",
			query: `query {
        products(
          first: 1
          channel: "default-channel"
          filter: { search: "apple" }
          sortBy: { field: NAME, direction: ASC }
        ) {
          totalCount
          edges {
            node {
              id
              name
              slug
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
		},
		{
			name: "Product Variants",
			query: `query {
        products(first: 1, channel: "default-channel") {
          edges {
            node {
              id
              name
              variants {
                id
                name
                pricing {
                  price {
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
      }`,
		},
		{
			name: "ProductListItem Fragment",
			query: `query {
        products(first: 1, channel: "default-channel") {
          edges {
            node {
              id
              name
              slug
              pricing {
                priceRange {
                  start {
                    gross {
                      amount
                      currency
                    }
                  }
                  stop {
                    gross {
                      amount
                      currency
                    }
                  }
                }
              }
              category {
                id
                name
              }
              thumbnail(size: 1024, format: WEBP) {
                url
                alt
              }
            }
          }
        }
      }`,
		},
		{
			name: "Collection with Products",
			query: `query {
        collections(first: 1, channel: "default-channel") {
          edges {
            node {
              name
              description
              seoDescription
              seoTitle
              products(first: 5) {
                edges {
                  node {
                    id
                    name
                    slug
                    pricing {
                      priceRange {
                        start {
                          gross {
                            amount
                            currency
                          }
                        }
                      }
                    }
                    thumbnail(size: 1024, format: WEBP) {
                      url
                      alt
                    }
                  }
                }
              }
            }
          }
        }
      }`,
		},
		{
			name: "Checkout Create",
			query: `mutation {
        checkoutCreate(input: { channel: "default-channel", lines: [] }) {
          checkout {
            id
            email
            totalPrice {
              gross {
                amount
                currency
              }
            }
          }
          errors {
            field
            code
            message
          }
        }
      }`,
		},
	];

	let passed = 0;
	let total = tests.length;

	for (const test of tests) {
		const success = await testQuery(test.name, test.query);
		if (success) passed++;
	}

	console.log(`\n📊 Results: ${passed}/${total} tests passed`);

	if (passed === total) {
		console.log("🎉 All tests passed! Your Saleor API is fully compatible.");
	} else {
		console.log("⚠️  Some tests failed. Check the errors above for details.");
	}
}

runTests().catch(console.error);
