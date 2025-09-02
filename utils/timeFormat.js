export function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const paddedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${paddedMinutes}:${paddedSeconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${paddedSeconds}`;
  } else {
    return `00:${paddedSeconds}`;
  }
}

export function getElapsedTime(start, now) {
  if (!start) return '';
  const ms = now - start;
  return formatTime(ms) + ' elapsed';
}
