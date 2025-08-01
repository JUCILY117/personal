import { getActivityImage } from "../../../utils/activityUtils";
import { getElapsedTime } from "../../../utils/timeFormat";

export default function ActivityCard({ activity, currentTime }) {
  if (!activity) return null;
  return (
    <div className="flex flex-col items-center">
      <img src={getActivityImage(activity)} alt={activity.name} className="w-16 h-16 rounded shadow-lg mb-2" />
      <div className="font-bold">{activity.name}</div>
      {activity.details && <div className="text-xs">{activity.details}</div>}
      {activity.timestamps?.start && (
        <div className="text-xs text-gray-400">{getElapsedTime(activity.timestamps.start, currentTime)}</div>
      )}
    </div>
  );
}
