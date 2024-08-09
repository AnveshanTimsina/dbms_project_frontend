document.addEventListener("DOMContentLoaded", async () => {
  const removeCartEventListeners = () => {
    const removeFromCartButtons = document.querySelectorAll(".remove-btn");

    removeFromCartButtons.forEach((button) => {
      button.removeEventListener("mouseup", handleRemoveFromCart);
      button.addEventListener("mouseup", handleRemoveFromCart);
    });
  };

  const handleRemoveFromCart = async function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user_id;
    const productId = this.getAttribute("data-product-id");

    try {
      const res = await apiFetch(
        `${API_URL}/cart/${userId}/deleteProductFromCart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: productId }),
        }
      );
      const data = await res.json();

      if (data.success) {
        alert(data.message);
        this.closest(".cart-item").remove();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error removing product from cart.", err);
    }
  };

  removeCartEventListeners();

  const observer = new MutationObserver(() => {
    removeCartEventListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
