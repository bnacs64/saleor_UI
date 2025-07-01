const query = JSON.stringify({
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
        } 
      } 
    } 
  }`,
});

fetch("https://api.4restaurants.store/graphql/", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: query,
})
	.then((res) => res.json())
	.then((data) => console.log(JSON.stringify(data, null, 2)))
	.catch((err) => console.error("Error:", err));
