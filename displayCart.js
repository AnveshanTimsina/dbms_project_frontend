document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;

  try {
    const res = await apiFetch(`cart/${userId}/readCartItems`);
    const data = await res.json();

    if (data.success) {
      const cartItems = data.result;
      const cartList = document.getElementById("cart-list");
      cartList.innerHTML = "";

      cartItems.map((cartItem) => {
        const item = document.createElement("li");
        item.classList.add("cart-item");

        const cartHTML = `<h3>${cartItem.product_name}</h3>
        <p>Price: $${cartItem.unit_price}</p>
        <label for="quantity${cartItem.product_id}"> Quantity: 
        <input type="number"
               id="quantity${cartItem.product_id}"
               name="quantity${cartItem.product_id}"
               value="${cartItem.no_of_products}"
               min="1">
        </label>
        <button class="remove-btn" data-product-id="${cartItem.product_id}">Remove from Cart</button>
        <button class="buy-btn" data-product-id="${cartItem.product_id}">Buy now!</button>`;
        // console.log(cartItem.product_id);
        item.innerHTML = cartHTML;
        cartList.appendChild(item);
      });
    }
  } catch (err) {
    console.error("Error loading cart items", err);
  }
});
