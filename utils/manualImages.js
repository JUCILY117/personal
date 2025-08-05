const API_URL = `https://${import.meta.env.VITE_HASURA_API}/api/rest/game-images`
const ADMIN_SECRET = import.meta.env.VITE_HASURA_SECRET;

export async function fetchManualImages() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'x-hasura-admin-secret': ADMIN_SECRET,
      }
    });
    if (!res.ok) throw new Error('Failed to fetch manual images');
    const data = await res.json();

    const imagesArray = Array.isArray(data)
      ? data
      : data.game_images;

    if (!imagesArray) {
      console.error('Unexpected response format');
      return {};
    }

    const images = {};
    imagesArray.forEach(item => {
      images[item.game_name] = item.image_url;
    });

    return images;
  } catch (err) {
    console.error("Error loading manual images", err);
    return {};
  }
}
