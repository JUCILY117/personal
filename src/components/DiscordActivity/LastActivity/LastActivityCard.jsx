import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { getUnifiedActivityImage } from '../../../../utils/activityUtils';
import { formatTimeAgo } from '../../../../utils/timeFormat';

export default function LastActivityCard({ activity }) {
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const currentTime = Date.now();

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const src = await getUnifiedActivityImage(activity.activity_data || {});
      if (active) {
        setImgSrc(src);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [activity]);

  if (!activity) return null;

  const lastSeen = activity.last_seen_at || activity.activity_data?.last_seen_at;
  const timeAgo = formatTimeAgo(lastSeen);

  const formatArtists = (artistString) => {
    if (!artistString) return null;
    const artists = artistString.split(';').map(a => a.trim());
    return artists.map((artist, i) => (
      <span key={i}>
        {artist}
        {i < artists.length - 1 && (
          <span className="mx-2 text-gray-500">
            <svg className="w-1 h-1 inline-block" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
          </span>
        )}
      </span>
    ));
  };

  let name = 'Unknown Title';
  let artist = '';
  let album = '';
  let showArtist = true;
  let type = activity.activity_type || 'Unknown Activity';

  const isSpotify = type === 'discord_presence' && !!activity.activity_data?.spotify;

  if (isSpotify) {
    const spotify = activity.activity_data.spotify;
    name = spotify.song || name;
    artist = spotify.artist || artist;
    album = spotify.album || '';
  } else if (type === 'discord_presence' && activity.activity_data) {
    if (activity.activity_data.crunchyroll) {
      name = activity.activity_data.crunchyroll.details || name;
      artist = activity.activity_data.crunchyroll.state || artist;
    } else if (Array.isArray(activity.activity_data.activities) && activity.activity_data.activities.length > 0) {
      const mainAct = activity.activity_data.activities[0];
      name = mainAct.name || name;
      if (mainAct.type === 0 || mainAct.type === 1) {
        artist = '';
        showArtist = false;
      } else {
        artist =
          mainAct.state ||
          mainAct.details ||
          mainAct.assets?.large_text ||
          mainAct.assets?.small_text ||
          '';
      }
      type = mainAct.name || type;
    }
  }

  return (
    <div className="max-w-xl relative bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-3xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg text-white font-sans flex gap-8 items-center max-sm:flex-col max-sm:max-w-sm max-sm:mx-auto">
      <div className="flex-shrink-0 w-40 h-40 rounded-2xl overflow-hidden bg-gray-800/70 flex items-center justify-center">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-700 rounded-2xl" />
        ) : (
          <img src={imgSrc} alt={name} className="w-full h-full object-cover rounded-2xl" draggable={false} />
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0 max-sm:text-center">
        {isSpotify && (
          <div className="mb-2 inline-flex items-center gap-2 text-green-400 text-sm font-semibold select-none">
            <FaSpotify className="w-5 h-5" />
            <span>Spotify</span>
          </div>
        )}

        <h2 className="text-3xl font-bold truncate mb-1" title={name}>
          {name}
        </h2>

        {isSpotify ? (
          <>
            <p className="text-green-400 font-medium truncate mb-2 text-sm" title={artist}>
              {formatArtists(artist)}
            </p>
            {album && (
              <p className="text-gray-400 text-sm truncate mb-2 text-xs" title={album}>
                {album}
              </p>
            )}
          </>
        ) : (
          showArtist &&
          artist && (
            <p className="text-indigo-300 text-lg truncate mb-2" title={artist}>
              {artist}
            </p>
          )
        )}

        <p className="text-green-400 font-mono text-base select-none">{timeAgo}</p>
      </div>
    </div>
  );
}
