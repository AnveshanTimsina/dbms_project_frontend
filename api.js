const apiFetch = async (url, options) => {
  const myUrl = `${window.location.host}`;
  // console.log(myUrl);
  // const configResponse = await fetch("/config.json");
  // const config = await configResponse.json();
  const API_URL = myUrl.includes("vercel")
    ? "https://backend-steel-three.vercel.app"
    : "http://localhost:8000";

  return fetch(`${API_URL}/${url}`, options);
};

// module.exports = apiFetch;
