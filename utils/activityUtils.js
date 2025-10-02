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

export async function getUnifiedActivityImage(activityData) {
  if (!activityData) return '';

  if (activityData.spotify?.album_art_url) {
    return activityData.spotify.album_art_url;
  }

  if (Array.isArray(activityData.activities)) {
    const mainAct = activityData.activities[0];
    if (mainAct && (mainAct.type === 0 || mainAct.type === 1)) {
      if (!manualImagesCache) {
        manualImagesCache = await fetchManualImages();
      }

      const gameName = mainAct.name?.toLowerCase();

      const foundKey = Object.keys(manualImagesCache).find(
        (key) => key.toLowerCase() === gameName
      );

      if (foundKey) {
        return manualImagesCache[foundKey];
      }
    }

    for (const act of activityData.activities) {
      if (act.assets?.large_image) {
        if (act.assets.large_image.startsWith('mp:')) {
          return `https://media.discordapp.net/${act.assets.large_image.replace(
            'mp:',
            ''
          )}`;
        }
        if (act.application_id && act.assets.large_image) {
          return `https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png`;
        }
        return act.assets.large_image;
      }
    }
  }

  return originalGetActivityImage(activityData);
}