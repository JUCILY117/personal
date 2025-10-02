import { useState, useEffect } from "react";
import { useLanyard } from "../../../hooks/useLanyard";
import StatusDisplay from "./StatusDisplay";
import ActivityCard from "./ActivityCard";
import SpotifyCard from "./SpotifyCard";
import CrunchyrollCard from "./CrunchyrollCard";
import { getMainActivity } from "../../../utils/activityUtils";
import NoActivity from './LastActivity/LastActivityContainer';

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export default function DiscordActivity() {
  const { data, loading, error } = useLanyard(DISCORD_ID);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-0 max-sm:px-4 max-sm:flex max-sm:justify-center">
        <div className="animate-pulse space-y-6 max-sm:w-full max-sm:max-w-sm">
          <div className="h-8 bg-gray-800/50 rounded w-3/4 mx-auto"></div>
          <div className="h-80 bg-gray-800/50 rounded-2xl"></div>
          <div className="h-6 bg-gray-800/50 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-0 max-sm:px-4 max-sm:flex max-sm:justify-center">
        <div className="relative anime-card rounded-3xl p-8 max-sm:w-full max-sm:max-w-sm text-center">
          <StatusDisplay status="offline" user={{ username: "User" }} position="top-right" />
          <div className="text-red-400">
            <p className="text-xl">Failed to load Discord activity</p>
            <p className="text-sm text-gray-500 mt-2 break-words">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-2xl mx-auto px-0 max-sm:px-4 max-sm:flex max-sm:justify-center">
        <div className="relative anime-card rounded-3xl p-8 max-sm:w-full max-sm:max-w-sm text-center">
          <StatusDisplay status="offline" user={{ username: "User" }} position="top-right" />
          <p className="text-xl text-gray-500">No Discord data available</p>
        </div>
      </div>
    );
  }

  const status = data.discord_status || "offline";
  const mainActivity = getMainActivity(data.activities);
  const spotify = data.spotify;
  const crunchyroll = data.activities?.find(a => a.name?.includes("Crunchyroll"));

  const showSpotify = spotify && data.listening_to_spotify;
  const showMainActivity = !showSpotify && mainActivity;
  const showCrunchyroll = !showSpotify && !showMainActivity && crunchyroll;

  return (
    <div className="w-full max-w-2xl mx-auto px-0 max-sm:px-4 space-y-8 max-sm:flex max-sm:flex-col max-sm:items-center">
      {showSpotify && (
        <SpotifyCard
          spotify={spotify}
          currentTime={now}
          status={status}
          user={data.discord_user}
        />
      )}

      {showMainActivity && (
        <ActivityCard
          activity={mainActivity}
          currentTime={now}
          status={status}
          user={data.discord_user}
        />
      )}

      {showCrunchyroll && (
        <CrunchyrollCard
          activity={crunchyroll}
          currentTime={now}
          status={status}
          user={data.discord_user}
        />
      )}

      {!showSpotify && !showMainActivity && !showCrunchyroll && (<NoActivity />)}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
