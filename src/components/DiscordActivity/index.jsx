import { useState, useEffect } from "react";
import { useLanyard } from "../../../hooks/useLanyard";
import StatusDisplay from "./StatusDisplay";
import ActivityCard from "./ActivityCard";
import SpotifyCard from "./SpotifyCard";
import CrunchyrollCard from "./CrunchyrollCard";
import { getMainActivity } from "../../../utils/activityUtils";

const DISCORD_ID = "1084416366121058364";

export default function DiscordActivity() {
  const { data, loading, error } = useLanyard(DISCORD_ID);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800/50 rounded w-3/4 mx-auto"></div>
          <div className="h-80 bg-gray-800/50 rounded-2xl"></div>
          <div className="h-6 bg-gray-800/50 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl text-center">
        <div className="relative anime-card rounded-3xl p-8">
          <StatusDisplay status="offline" user={{ username: "User" }} position="top-right" />
          <div className="text-red-400">
            <p className="text-xl">Failed to load Discord activity</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return (
    <div className="w-full max-w-2xl text-center">
      <div className="relative anime-card rounded-3xl p-8">
        <StatusDisplay status="offline" user={{ username: "User" }} position="top-right" />
        <p className="text-xl text-gray-500">No Discord data available</p>
      </div>
    </div>
  );

  const status = data.discord_status || "offline";
  const mainActivity = getMainActivity(data.activities);
  const spotify = data.spotify;
  const crunchyroll = data.activities?.find(a => a.name?.includes("Crunchyroll"));

  // Priority: Spotify > Game > Crunchyroll > Status only
  const showSpotify = spotify && data.listening_to_spotify;
  const showMainActivity = !showSpotify && mainActivity;
  const showCrunchyroll = !showSpotify && !showMainActivity && crunchyroll;

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Main activity display with integrated status indicators */}
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
      
      {!showSpotify && !showMainActivity && !showCrunchyroll && (
        <div className="relative text-center py-16 anime-card rounded-3xl">
          <StatusDisplay status={status} user={data.discord_user} position="top-right" />
          <div className="text-6xl mb-6">🎵</div>
          <p className="text-2xl text-gray-300 mb-2">No current activity</p>
          <p className="text-lg text-gray-500">Check back later to see what I'm up to!</p>
        </div>
      )}
    </div>
  );
}
