import StatusIndicator from "./StatusIndicator";

export default function StatusDisplay({ status, user, position = "top-right" }) {
  const displayName = user?.display_name || user?.global_name || user?.username || "Gravy";
  
  const positionClasses = {
    "top-right": "absolute top-4 right-4",
    "top-left": "absolute top-4 left-4", 
    "center": "flex items-center justify-center mb-6",
    "inline": "flex items-center gap-3"
  };

  if (position === "center") {
    return (
      <div className="flex items-center justify-center gap-3 mb-6">
        <StatusIndicator status={status} size="md" />
        <div>
          <p className="text-lg font-medium anime-gradient-text">
            {displayName}
          </p>
          <p className="text-sm text-anime-text-muted capitalize">
            {status}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={positionClasses[position]} title={`${displayName} is ${status}`}>
      <StatusIndicator status={status} size="md" />
    </div>
  );
}
