// utils/activityUtils.js

export function getMainActivity(activities) {
  if (!activities) return null;
  // Only return games/apps, NOT Crunchyroll (we handle that separately)
  return (
    activities.find(a => a.type === 0 && !a.name?.includes("Crunchyroll")) || // Game/playing but not Crunchyroll
    activities.find(a => a.type === 1 && !a.name?.includes("Crunchyroll")) || // Streaming but not Crunchyroll
    null
  );
}

export function getActivityImage(activity) {
  if (!activity) return "";
  
  const manualImages = {
    "VALORANT": "https://images.igdb.com/igdb/image/upload/t_cover_big/co8ok7.jpg",
    // ...add more as desired
  };
  
  if (manualImages[activity.name]) return manualImages[activity.name];
  
  // Standard Discord large image logic
  if (activity.assets?.large_image) {
    if (activity.assets.large_image.startsWith("mp:")) {
      return `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`;
    }
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  }
  
  return "";
}
