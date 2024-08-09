document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;

  try {
    const configResponse = await fetch("/config.json");
    const config = await configResponse.json();
    const API_URL = config.API_URL;
    const res = await fetch(`${API_URL}/product/${userId}/yourProducts`);
    const data = await res.json();

    if (data.success) {
      const products = data.result;
      const productList = document.getElementById("product-list");

      productList.innerHTML = "";

      products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.classList.add("product-item");

        const productLink = document.createElement("a");
        productLink.href = `productInfo.html?product_name=${encodeURIComponent(
          product.product_name
        )}`;
        productLink.textContent = product.product_name;

        const productHTML = `
            <p>$${product.unit_price}</p>`;

        productItem.appendChild(productLink);
        productItem.innerHTML += productHTML;

        productList.appendChild(productItem);
      });
    }
  } catch (err) {
    console.error("Error displaying products.", err);
  }
});
