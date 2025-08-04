export default function StatusIndicator({ status = "offline", floating = false }) {
  const statusClass = `status-icon status-${status}`;

  if (floating) {
    return (
      <div className="absolute -top-2 -right-2 z-10">
        <div className={`
          ${statusConfig[status]?.color || "bg-gray-500"}
          px-2 py-1 rounded-full text-xs text-white font-medium
          shadow-lg ${statusConfig[status]?.glow || "shadow-gray-400/30"}
          border-2 border-white backdrop-blur-sm
        `}>
          {statusConfig[status]?.text || "Offline"}
        </div>
      </div>
    );
  }

  return (
    <div className={statusClass}></div>
  );
}
