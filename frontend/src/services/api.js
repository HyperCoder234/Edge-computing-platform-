const BASE_URL = "https://edge-computing-platform.onrender.com/api";

export const fetchData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/data`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};