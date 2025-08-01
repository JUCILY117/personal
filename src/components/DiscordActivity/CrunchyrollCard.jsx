import { formatTime } from "../../../utils/timeFormat";
import { getElapsedTime } from "../../../utils/timeFormat";
import { getActivityImage } from "../../../utils/activityUtils";
import StatusDisplay from "./StatusDisplay";

export default function CrunchyrollCard({ activity, currentTime, status, user }) {
  if (!activity) return null;

  const elapsedTime = getElapsedTime(activity.timestamps?.start, currentTime);
  const animeName = activity.details || "Unknown Anime";
  const episodeInfo = activity.state || "Unknown Episode";
  const seasonEpisode = activity.assets?.large_text || "";
  const coverImage = getActivityImage(activity);

  return (
    <div className="w-full max-w-2xl">
      <div className="relative h-86 bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-3xl backdrop-blur-sm border border-slate-700/30 overflow-hidden">
        {/* Status Indicator */}
        {/* <StatusDisplay status={status} user={user} position="top-right" /> */}
        
        {/* Large Background Image */}
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={`${animeName} cover`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x256/1e293b/f97316?text=Anime";
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/90"></div>
        </div>

        {/* Floating Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="flex items-center gap-8 px-8 w-full">
            {/* Bigger Compact Poster */}
            <div className="relative flex-shrink-0">
              <img
                src={coverImage}
                alt={`${animeName} cover`}
                className="w-56 h-78 object-cover rounded-xl border-2 border-orange-500/50 shadow-2xl"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/176x224/1e293b/f97316?text=Anime";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                {/* <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div> */}
                <span className="text-orange-400 font-bold uppercase tracking-wider">Watching Crunchyroll</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white leading-tight">
                {animeName}
              </h2>
              
              <p className="text-xl text-orange-300 font-medium">
                {episodeInfo}
              </p>
              
              {seasonEpisode && (
                <p className="text-slate-300">{seasonEpisode}</p>
              )}
              
              <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-500/30">
                <span className="text-orange-400 font-medium">⏱️ {elapsedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}