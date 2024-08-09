document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;

  try {
    const res = await apiFetch(`product/${userId}/randomProducts`);
    const data = await res.json();

    if (data.success) {
      const products = data.result;
      const productList = document.getElementById("product-list");

      productList.innerHTML = "";

      products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.classList.add("product-item");

        const productHTML = `
          <h3><a href="productInfo.html?product_name=${encodeURIComponent(
            product.product_name
          )}">${product.product_name}</a></h3>
          <p>$${product.unit_price}</p>
          <label for="toggle-checkbox-${product.product_id}">
              <input type="checkbox"
                     id="toggle-checkbox-${product.product_id}"
                     data-product-id="${product.product_id}">
          </label>
          <button class="add-btn" data-product-id="${product.product_id}">
            Add to Cart
          </button>`;

        productItem.innerHTML = productHTML;
        productList.appendChild(productItem);

        const checkbox = productItem.querySelector(
          `#toggle-checkbox-${product.product_id}`
        );
        checkbox.addEventListener("change", async function () {
          const productId = this.getAttribute("data-product-id");
          try {
            if (this.checked) {
              const res = await apiFetch(`favorite/${userId}/addToFavorites`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ product_id: productId }),
              });
              const result = await res.json();

              if (result.success) {
                productList.removeChild(productItem);

                const favoriteList = document.getElementById(
                  "favorite-product-list"
                );

                const favoriteItem = document.createElement("li");
                favoriteItem.classList.add("favorite-item");
                const favoriteHTML = `
                  <h3><a href="productInfo.html?product_name=${encodeURIComponent(
                    product.product_name
                  )}">${product.product_name}</a></h3>
                  <p>$${product.unit_price}</p>
                  <label for="toggle-checkbox-${product.product_id}">
                      <input type="checkbox" 
                             id="toggle-checkbox-${product.product_id}" 
                             data-product-id="${product.product_id}" 
                             checked>
                  </label>
                  <button>Add to Cart</button>`;

                favoriteItem.innerHTML = favoriteHTML;
                favoriteList.appendChild(favoriteItem);
              } else {
                try {
                  const res = await apiFetch(
                    `favorite/${userId}/deleteFromFavorites`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ product_id: productId }),
                    }
                  );
                  const result = await res.json();

                  if (result.success) {
                    favoriteList.removeChild(favoriteItem);
                    return;
                  }
                } catch (err) {
                  console.error("Error removing product from favorites.", err);
                }
              }
            }
          } catch (err) {
            console.error("Error updating favorites.", err);
          }
        });
      });
    }
  } catch (err) {
    console.error("Error displaying products.", err);
  }
});
