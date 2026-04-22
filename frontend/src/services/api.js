const BASE_URL = "http://localhost:5000/api";

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