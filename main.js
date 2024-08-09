const user = checkAuth();
if (user) {
  const type = user.type;
  if (type === "buyer") {
    window.open(buyer.html);
  } else window.open(seller.html);
}
