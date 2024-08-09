const apiFetch = async (url, options) => {
  const configResponse = await fetch("/config.json");
  const config = await configResponse.json();
  const API_URL = config.API_URL;

  return fetch(`${API_URL}/${url}`, options);
};

// module.exports = apiFetch;
