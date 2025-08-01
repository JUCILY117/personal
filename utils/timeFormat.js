// utils/timeFormat.js

export function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

export function getElapsedTime(start, now) {
  if (!start) return "";
  const ms = now - start;
  return formatTime(ms) + " elapsed";
}
