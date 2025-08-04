import { getElapsedTime } from "../../../utils/timeFormat";
import { getActivityImage } from "../../../utils/activityUtils";

export default function CrunchyrollCard({ activity, currentTime, status, user }) {
  if (!activity) return null;

  const elapsedTime = getElapsedTime(activity.timestamps?.start, currentTime);
  const animeName = activity.details || "Unknown Anime";
  const episodeInfo = activity.state || "Unknown Episode";
  const seasonEpisode = activity.assets?.large_text || "";
  const coverImage = getActivityImage(activity);

  return (
    <div className="w-full max-w-2xl">
      <div className="relative min-h-[22rem] bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-3xl backdrop-blur-sm border border-slate-700/30 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={`${animeName} cover`}
            className="w-full h-full object-cover"
            onError={e => {
              e.target.src = "https://via.placeholder.com/600x256/1e293b/f97316?text=Anime";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 h-full flex items-center px-8 py-8">
          <div className="w-52 h-78 flex-shrink-0 mr-8 hidden sm:block">
            <img
              src={coverImage}
              alt={`${animeName} cover`}
              className="w-full h-full object-cover rounded-xl border-2 border-orange-500/50 shadow-2xl"
            />
          </div>
          <div className="flex-1 space-y-4 min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-orange-400 font-bold uppercase tracking-wider">
                Watching Crunchyroll
              </span>
            </div>
            <h2
              className="text-3xl font-bold text-white leading-tight break-words line-clamp-2 max-h-[3.2em]"
              title={animeName}
              style={{ wordBreak: "break-word" }}
            >
              {animeName}
            </h2>
            <p className="text-xl text-orange-300 font-medium break-words">
              {episodeInfo}
            </p>
            {seasonEpisode && (
              <p className="text-slate-300">{seasonEpisode}</p>
            )}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-500/30">
              <span className="text-orange-400 font-medium">
                ⏱️ {elapsedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
