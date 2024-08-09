document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;

  try {
    const res = await apiFetch(`${API_URL}/user/${userId}`);
    const data = await res.json();

    if (data.success) {
      const userInfo = data.result;

      const profileContainer = document.getElementById("profile-container");

      const userInfoHTML = `
          <h2>${userInfo.type}'s Profile Information</h2>
          <p><strong>Username:</strong> ${userInfo.username}</p>
          <p><strong>Email:</strong> ${userInfo.email}</p>
          <p><strong>Phone:</strong> ${userInfo.phone}</p>
          <p><strong>First Name:</strong> ${userInfo.first_name}</p>
          <p><strong>Last Name:</strong> ${userInfo.last_name}</p>
        `;

      profileContainer.innerHTML = userInfoHTML;
    }
  } catch (err) {
    console.error("Error fetching user information.");
  }
});
