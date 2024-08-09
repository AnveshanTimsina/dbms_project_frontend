document.addEventListener("DOMContentLoaded", async () => {
  const addProductEventListeners = () => {
    const addProductForm = document.getElementById("add-product-form");

    addProductForm.removeEventListener("submit", handleAddProduct);
    addProductForm.addEventListener("submit", handleAddProduct);
  };

  const handleAddProduct = async function (event) {
    event.preventDefault();

    const product_name = document.getElementById("product_name").value;
    const product_description = document.getElementById(
      "product_description"
    ).value;
    const unit_price = parseFloat(document.getElementById("unit_price").value);
    const stock_quantity = parseInt(
      document.getElementById("stock_quantity").value
    );

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user_id;

    try {
      const configResponse = await fetch("/config.json");
      const config = await configResponse.json();
      const API_URL = config.API_URL;
      const res = await fetch(`${API_URL}/product/${userId}/addNewProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name,
          product_description,
          unit_price,
          stock_quantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        window.location.href = "sellerProducts.html";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error adding a product.", err);
      alert("Error adding a product. Please try again later.");
    }
  };

  addProductEventListeners();

  const observer = new MutationObserver(() => {
    addProductEventListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
