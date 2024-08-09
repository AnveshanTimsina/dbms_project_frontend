const signup = () => {
  const first_name = document.getElementById("firstname").value;
  const last_name = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const type = document.querySelector(`input[name="user-type"]:checked`).value;

  const requestBody = {
    first_name,
    last_name,
    type,
    email,
    phone,
    username,
    password,
  };

  async function getUser() {
    try {
      const res = await apiFetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const jsonRes = await res.json();
      if (jsonRes.success === false) {
        document.getElementById("signup_message").innerHTML = "Sign up failed!";
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
