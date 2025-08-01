import { formatTime } from "../../../utils/timeFormat";
import ActivityImage from "../common/ActivityImage";
import StatusDisplay from "./StatusDisplay";

export default function SpotifyCard({ spotify, currentTime, status, user }) {
  if (!spotify) return null;

  const progressMs = Math.max(0, Math.min(
    currentTime - spotify.timestamps.start, 
    spotify.timestamps.end - spotify.timestamps.start
  ));
  const totalMs = spotify.timestamps.end - spotify.timestamps.start;
  const progressPercent = (progressMs / totalMs) * 100;

  // Format artists with icon separator
  const formatArtists = (artistString) => {
    if (!artistString) return '';
    const artists = artistString.split(';').map(artist => artist.trim());
    return artists.map((artist, index) => (
      <span key={index}>
        {artist}
        {index < artists.length - 1 && (
          <span className="mx-2 text-gray-500">
            <svg className="w-1 h-1 inline-block" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3"/>
            </svg>
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="w-full max-w-xl ml-8">
      <div className="relative bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-3xl p-6 backdrop-blur-sm border border-gray-700/30">
        {/* Status Indicator - Top Right */}
        <StatusDisplay status={status} user={user} position="top-right" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl"></div>
        
        <div className="relative">
          {/* Header inside card - Left aligned */}

          <div className="mb-4">
            <p className="text-sm text-gray-400 text-left">
              Currently listening to{" "}
              <a
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Spotify
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            {/* Album Art */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <a
                  href={`https://open.spotify.com/track/${spotify.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ActivityImage
                    src={spotify.album_art_url}
                    alt={`${spotify.album} by ${spotify.artist}`}
                    className="w-32 h-32 rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:cursor-pointer"
                  />
                </a>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              {/* Song Title with tooltip for long names */}
              <h3 className="text-2xl font-bold text-white mb-1 truncate" title={spotify.song}>
                {spotify.song}
              </h3>
              
              <div className="space-y-1 mb-4">
                {/* Artists with icon separator */}
                <div className="text-lg text-green-400 font-medium truncate" title={spotify.artist}>
                  {formatArtists(spotify.artist)}
                </div>
                <p className="text-sm text-gray-400 truncate" title={spotify.album}>
                  {spotify.album}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-green-400 rounded-full shadow-lg transition-all duration-1000 ease-linear"
                    style={{ left: `calc(${progressPercent}% - 8px)` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>{formatTime(progressMs)}</span>
                  <span>{formatTime(totalMs)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
