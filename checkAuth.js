function checkAuth() {
  let user = null;
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const parsedUser = JSON.stringify(userString);
      if (parsedUser) {
        user = parsedUser;
      }
    } catch (err) {
      console.error("User not found.");
    }
  }
  if (!user) {
    alert("Not authenticated!");
    window.open("index.html");
    return;
  }

  return user;
}
module.exports = checkAuth;
