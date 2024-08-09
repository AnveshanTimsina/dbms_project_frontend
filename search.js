document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const searchResultsSection = document.getElementById(
    "search-results-container"
  );

  searchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      alert("Please enter a product name to search.");
      return;
    }

    try {
      const res = await apiFetch(`${API_URL}/product/searchProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name: searchTerm }),
      });

      const data = await res.json();

      if (data.success) {
        searchResultsSection.style.display = "block";
        searchResultsContainer.innerHTML = "";

        if (data.result.length > 0) {
          data.result.forEach((item) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");

            link.textContent = item.product_name;
            link.href = `productInfo.html?product_name=${encodeURIComponent(
              item.product_name
            )}`;
            link.target = "_blank";

            listItem.appendChild(link);
            searchResultsContainer.appendChild(listItem);
          });
        } else {
          searchResultsContainer.innerHTML = "<li>No products found.</li>";
        }
      } else {
        console.error("Error: Unsuccessful search.");
      }
    } catch (err) {
      console.error("Error in search.", err);
    }
  });
});
