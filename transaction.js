// // async function handleBuyNow(productId) {
// //   try {
//
// //     const res = await apiFetch(
// //       `transaction/:uid/addTransaction`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );
// //     const data = await res.json();

// //     if (data.success) {
// //       const button = document.querySelector(
// //         `button[data-product-id="${productId}"]`
// //       );
// //       button.textContent = "Bought!";
// //       button.disabled = true;
// //     } else {
// //       console.error("Error processing purchase:", data.message);
// //     }
// //   } catch (err) {
// //     console.error("Error processing purchase:", err);
// //   }
// // }

// // window.handleBuyNow = handleBuyNow;

// document.addEventListener("DOMContentLoaded", async () => {
//   const buyItem = () => {
//     const buyItemButtons = document.querySelectorAll(".buy-btn");

//     buyItemButtons.forEach((button) => {
//       button.removeEventListener("mouseup", handleBuy);
//       button.addEventListener("mouseup", handleBuy);
//     });
//   };

//   const handleBuy = async function () {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user.user_id;
//     const productId = this.getAttribute("data-product-id");

//     try {
//       const res = await apiFetch(
//         `transaction/${userId}/addTransaction`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ product_id: productId }),
//         }
//       );
//       const data = await res.json();

//       if (data.success) {
//         alert(data.message);
//         this.closest(".cart-item").remove();
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error("Error removing product from cart.", err);
//     }
//   };

//   removeCartEventListeners();

//   const observer = new MutationObserver(() => {
//     removeCartEventListeners();
//   });
//   observer.observe(document.body, { childList: true, subtree: true });
// });
