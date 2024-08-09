document.addEventListener("DOMContentLoaded", async () => {
  const addCartEventListeners = () => {
    const addToCartButtons = document.querySelectorAll(".add-btn");

    addToCartButtons.forEach((button) => {
      button.removeEventListener("mouseup", handleAddToCart);
      button.addEventListener("mouseup", handleAddToCart);
    });
  };

  const handleAddToCart = async function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user_id;
    const productId = this.getAttribute("data-product-id");

    try {
      const res = await apiFetch(`${API_URL}/cart/${userId}/addCartItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });
      const data = await res.json();

      if (data.success) {
        alert(data.message);
      } else alert(data.message);
    } catch (err) {
      console.log("Error adding product to cart.", err);
    }
  };
  addCartEventListeners();

  const observer = new MutationObserver(() => {
    addCartEventListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
