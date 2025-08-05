import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getElapsedTime } from "../../../utils/timeFormat";
import { getActivityImage } from "../../../utils/activityUtils";

export default function CrunchyrollCard({ activity, currentTime }) {
  if (!activity) return null;

  const [coverImage, setCoverImage] = useState("");
  const elapsedTime = getElapsedTime(activity.timestamps?.start, currentTime);
  const animeName = activity.details || "Unknown Anime";
  const episodeInfo = activity.state || "Unknown Episode";
  const seasonEpisode = activity.assets?.large_text || "";

  const isImageLoading = !coverImage;
  const isTextLoading = animeName === "Unknown Anime";

  useEffect(() => {
    let isMounted = true;
    getActivityImage(activity).then(url => {
      if (isMounted) setCoverImage(url);
    });
    return () => { isMounted = false };
  }, [activity]);

  return (
    <div className="w-full max-w-2xl">
      <div className="relative min-h-[22rem] bg-gradient-to-br from-slate-900/60 to-slate-800/40 rounded-3xl backdrop-blur-sm border border-slate-700/30 overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence>
            {isImageLoading ? (
              <motion.div
                key="skeleton-bg"
                className="w-full h-full bg-slate-800 rounded-3xl animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <motion.img
                key="cover-img"
                src={coverImage}
                alt={`${animeName} cover`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/90" />
        </div>
        <div className="relative z-10 h-full flex items-center px-8 py-8">
          <div className="w-52 h-78 flex-shrink-0 mr-8 hidden sm:block relative rounded-xl overflow-hidden">
            <motion.div
              className="w-full h-full bg-slate-800 animate-pulse absolute inset-0 rounded-xl border-2 border-orange-500/50 shadow-2xl"
              style={{
                opacity: isImageLoading ? 1 : 0,
                pointerEvents: "none",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={coverImage}
              alt={`${animeName} cover`}
              className="w-full h-full object-cover rounded-xl border-2 border-orange-500/50 shadow-2xl absolute inset-0"
              style={{
                opacity: isImageLoading ? 0 : 1,
                pointerEvents: isImageLoading ? "none" : "auto",
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex-1 space-y-4 min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-orange-400 font-bold uppercase tracking-wider">
                Watching Crunchyroll
              </span>
            </div>
            <AnimatePresence>
              {isTextLoading ? (
                <motion.div
                  key="skeleton-title"
                  className="h-[2.2em] bg-slate-700/50 rounded mb-3 w-3/4 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.h2
                  key="real-title"
                  className="text-3xl font-bold text-white leading-tight break-words line-clamp-2 max-h-[3.2em]"
                  title={animeName}
                  style={{ wordBreak: "break-word" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {animeName}
                </motion.h2>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isTextLoading ? (
                <motion.div
                  key="skeleton-epi"
                  className="h-[1.4em] bg-slate-700/50 rounded w-1/2 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.p
                  key="real-epi"
                  className="text-xl text-orange-300 font-medium break-words"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {episodeInfo}
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isTextLoading ? (
                <motion.div
                  key="skeleton-se"
                  className="h-[1.2em] bg-slate-700/50 rounded w-1/3 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                seasonEpisode && (
                  <motion.p
                    key="real-se"
                    className="text-slate-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {seasonEpisode}
                  </motion.p>
                )
              )}
            </AnimatePresence>
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
