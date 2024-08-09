document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;
  try {
    const configResponse = await fetch("/config.json");
    const config = await configResponse.json();
    const API_URL = config.API_URL;
    const res = await fetch(`${API_URL}/favorite/${userId}/getFavorites`);
    const data = await res.json();

    if (data.success) {
      const favorites = data.result;
      const favoriteList = document.getElementById("favorite-product-list");
      favoriteList.innerHTML = "";

      favorites.forEach((favorite) => {
        const favoriteItem = document.createElement("li");
        favoriteItem.classList.add("favorite-item");

        const favoriteHTML = `
          <h3><a href="productInfo.html?product_name=${encodeURIComponent(
            favorite.product_name
          )}">${favorite.product_name}</a></h3>
          <p>$${favorite.unit_price}</p>
          <label for="toggle-checkbox-${favorite.product_id}">
              <input type="checkbox" 
                     id="toggle-checkbox-${favorite.product_id}" 
                     data-product-id="${favorite.product_id}" 
                     checked>
          </label>
          <button class="add-btn" data-product-id="${
            favorite.product_id
          }">Add to Cart</button>`;

        favoriteItem.innerHTML = favoriteHTML;
        favoriteList.appendChild(favoriteItem);

        const checkbox = favoriteItem.querySelector(
          `#toggle-checkbox-${favorite.product_id}`
        );

        checkbox.addEventListener("change", async function () {
          if (!this.checked) {
            const productId = this.getAttribute("data-product-id");
            try {
              const res = await fetch(
                `${API_URL}/favorite/${userId}/deleteFromFavorites`,
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
        });
      });
    }
  } catch (err) {
    console.error("Error displaying favorites.", err);
  }
});
