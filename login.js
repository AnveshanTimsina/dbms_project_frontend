const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const type = document.querySelector(`input[name="user-type"]:checked`).value;

  const requestBody = {
    username,
    password,
    type,
  };

  async function getUser() {
    try {
      const res = await apiFetch(`login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const jsonRes = await res.json();
      if (jsonRes.success === false) {
        document.getElementById("login_message").innerHTML = "Login Failed!";
        return;
      } else {
        const { user } = jsonRes;
        localStorage.setItem("user", JSON.stringify(user));
        const type = user.type;
        console.log(type);
        if (type === "buyer") {
          window.location.replace("buyer.html");
        } else {
          console.log(type);
          window.location.replace("seller.html");
        }
      }
    } catch (err) {
      console.error("Error!!!", err);
    }
  }
  getUser();
};
