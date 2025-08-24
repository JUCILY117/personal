import { fetchManualImages } from './manualImages';

export function getMainActivity(activities) {
  if (!activities) return null;
  return (
    activities.find(a => a.type === 0 && !a.name?.includes("Crunchyroll")) ||
    activities.find(a => a.type === 1 && !a.name?.includes("Crunchyroll")) ||
    null
  );
}

let manualImagesCache = null;

export async function getActivityImage(activity) {
  if (!activity) return '';

  if (activity.assets?.large_image) {
    if (activity.assets.large_image.startsWith('mp:')) {
      return `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`;
    }
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  }

  if (!manualImagesCache) {
    manualImagesCache = await fetchManualImages();
  }

  if (manualImagesCache[activity.name]) {
    return manualImagesCache[activity.name];
  }

  const lowerName = activity.name.toLowerCase();
  const foundKey = Object.keys(manualImagesCache).find(k => k.toLowerCase() === lowerName);
  if (foundKey) {
    return manualImagesCache[foundKey];
  }

  return '/images/controller-placeholder.png';
}

