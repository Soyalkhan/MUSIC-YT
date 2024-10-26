const BASE_URL = 'https://jiosaavn-api.vercel.app';

export const fetchMusicData = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results; // Adjust according to the actual response structure
  } catch (error) {
    console.error("Error fetching music data:", error);
    return [];
  }
};
