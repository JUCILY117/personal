import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { SiCrunchyroll } from 'react-icons/si';
import { IoGameController } from 'react-icons/io5';
import { FaHistory } from "react-icons/fa";
import { getUnifiedActivityImage } from '../../../../utils/activityUtils';
import { formatTimeAgo } from '../../../../utils/timeFormat';

export default function LastActivityCard({ activity }) {
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(true);

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

  const crunchyrollActivity =
    Array.isArray(activity.activity_data?.activities) &&
    activity.activity_data.activities.find(act => act.name === 'Crunchyroll');

  const isCrunchyroll = Boolean(crunchyrollActivity);

  let name = 'Unknown Title';
  let artist = '';
  let album = '';
  let showArtist = true;
  let type = activity.activity_type || 'Unknown Activity';

  const isSpotify = type === 'discord_presence' && !!activity.activity_data?.spotify;

  const isGame =
    !isSpotify &&
    !isCrunchyroll &&
    type === 'discord_presence' &&
    activity.activity_data &&
    Array.isArray(activity.activity_data.activities) &&
    activity.activity_data.activities.length > 0;

  if (isSpotify) {
    const spotify = activity.activity_data.spotify;
    name = spotify.song || name;
    artist = spotify.artist || artist;
    album = spotify.album || '';
  } else if (isCrunchyroll) {
    name = crunchyrollActivity.details || 'Unknown Anime';
    artist = crunchyrollActivity.state || null;
    album = crunchyrollActivity.assets?.large_text || '';
    showArtist = false;
  } else if (isGame) {
    const mainAct = activity.activity_data.activities[0];
    name = mainAct.name || name;
    showArtist = false;
    type = mainAct.name || type;
  }

  const containerClass = isCrunchyroll
    ? 'max-w-4xl min-h-[20rem] sm:min-h-[22rem] relative rounded-3xl p-6 flex gap-8 items-center max-sm:flex-col max-sm:max-w-sm max-sm:mx-auto text-white'
    : 'max-w-xl relative bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-3xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg text-white flex gap-8 items-center max-sm:flex-col max-sm:max-w-sm max-sm:mx-auto';

  const backgroundStyle = isCrunchyroll && imgSrc
    ? {
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  const coverClass = isCrunchyroll
    ? 'relative w-auto h-auto max-w-[200px] max-h-[280px] sm:max-w-[220px] sm:max-h-[300px] rounded-2xl overflow-hidden flex-shrink-0'
    : isGame
    ? 'w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0'
    : 'w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0';

  return (
    <div
      className={
        containerClass +
        ' flex-col sm:flex-row max-sm:items-start max-sm:gap-4'
      }
      style={backgroundStyle}
    >
      <div
        className={
          coverClass +
          ' max-sm:w-full max-sm:max-w-full max-sm:h-auto max-sm:mx-auto'
        }
      >
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-700 rounded-2xl" />
        ) : isSpotify && activity.activity_data.spotify?.track_id ? (
          <motion.a
            href={`https://open.spotify.com/track/${activity.activity_data.spotify.track_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full h-full cursor-pointer rounded-2xl overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { outline: 'none' },
              hover: { outline: '2px solid #1DB954' }
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-contain rounded-2xl"
              draggable={false}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.div
              className="absolute bottom-2 left-2 text-green-500"
              variants={{
                rest: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <FiExternalLink size={20} />
            </motion.div>
          </motion.a>
        ) : (
          <img
            src={imgSrc}
            alt={name}
            className={`w-full h-full ${
              isGame ? 'object-cover' : 'object-contain'
            } rounded-2xl`}
            draggable={false}
          />
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0 max-sm:w-full max-sm:text-left">
        {isSpotify && (
          <div className="mb-2 inline-flex items-center gap-2 text-green-400 text-sm font-semibold select-none">
            <FaSpotify className="w-5 h-5" />
            <span>Spotify</span>
          </div>
        )}
        {isCrunchyroll && (
          <div className="mb-2 inline-flex items-center gap-2 text-orange-400 text-sm font-semibold select-none">
            <SiCrunchyroll className="w-5 h-5" />
            <span>Crunchyroll</span>
          </div>
        )}
        {isGame && (
          <div className="mb-2 inline-flex items-center gap-2 text-green-400 text-sm font-semibold select-none">
            <IoGameController className="w-5 h-5" />
            <span>Was Playing</span>
          </div>
        )}

        <h2
          className={
            isCrunchyroll
              ? 'text-3xl font-bold mb-1 text-orange-100 break-words line-clamp-2'
              : 'text-3xl font-bold truncate mb-1'
          }
          title={name}
        >
          {name}
        </h2>

        {isCrunchyroll ? (
          <>
            {artist && (
              <p
                className="text-orange-300 font-semibold text-lg mb-1"
                title={artist}
              >
                {artist}
              </p>
            )}
            {album && (
              <p
                className="text-orange-200 text-sm truncate mb-2"
                title={album}
              >
                {album}
              </p>
            )}
            <p className="text-orange-300 font-mono text-base select-none inline-flex items-center gap-2">
              <FaHistory className="text-orange-300" />
              {timeAgo}
            </p>
          </>
        ) : isSpotify ? (
          <>
            <p
              className="text-green-400 font-medium truncate mb-2 text-sm"
              title={artist}
            >
              {formatArtists(artist)}
            </p>
            {album && (
              <p
                className="text-gray-400 text-sm truncate mb-2 text-xs"
                title={album}
              >
                {album}
              </p>
            )}
            <p className="text-green-400 font-mono text-base select-none inline-flex items-center gap-2">
              <FaHistory className="text-green-400" />
              {timeAgo}
            </p>
          </>
        ) : (
          <>
            {showArtist && artist && (
              <p
                className="text-indigo-300 text-lg truncate mb-2"
                title={artist}
              >
                {artist}
              </p>
            )}
            <p className="text-green-400 font-mono text-base select-none inline-flex items-center gap-2">
              <FaHistory className="text-green-400" />
              {timeAgo}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function formatArtists(artistString) {
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
}
