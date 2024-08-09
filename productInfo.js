document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product_name = urlParams.get("product_name");

  if (product_name) {
    try {
      const res = await apiFetch(`${API_URL}/product/productInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name }),
      });

      const data = await res.json();

      if (data.success) {
        const product = data.result[0];
        document.getElementById("product-name").textContent =
          product.product_name;
        document.getElementById("product-description").textContent =
          product.product_description;
        document.getElementById("product-price").textContent =
          product.unit_price;
        document.getElementById("product-stock").textContent =
          product.stock_quantity;
        document.getElementById("seller-name").textContent = product.username;
        document.getElementById("seller-email").textContent = product.email;
        document.getElementById("seller-phone").textContent = product.phone;
        document.getElementById("seller-first-name").textContent =
          product.first_name;
        document.getElementById("seller-last-name").textContent =
          product.last_name;
      } else {
        console.error("Failed to retrieve product information.");
      }
    } catch (err) {
      console.error("Error in displaying product info.", err);
    }
  } else {
    console.error("No product name found in the URL.");
  }
});
