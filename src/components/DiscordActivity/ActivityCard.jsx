import { useState, useEffect, useRef } from 'react';
import { getActivityImage } from '../../../utils/activityUtils';
import { getElapsedTime } from '../../../utils/timeFormat';

function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={ref}
    >
      {children}
      {visible && text && (
        <div
          className="fixed z-50 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm shadow-2xl whitespace-pre-line"
          style={{
            minWidth: 180,
            maxWidth: 340,
            top: (ref.current?.getBoundingClientRect().top || 0) - 60,
            left: ((ref.current?.getBoundingClientRect().left || 0) +
              ((ref.current?.offsetWidth || 0) / 2) - 160),
            pointerEvents: 'none',
            animation: 'fadeInScale .15s ease',
          }}
        >
          {text}
          <style>{`
            @keyframes fadeInScale {
              0% { transform: scale(0.95); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </span>
  );
}

export default function ActivityCard({ activity, currentTime }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const src = await getActivityImage(activity);
      if (!cancelled) {
        setImgSrc(src);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [activity]);

  if (!activity) return null;

  const { name, details, state, timestamps, assets } = activity;
  const startedAt = timestamps?.start ? getElapsedTime(timestamps.start, currentTime) : null;

  return (
     <div className="
      max-w-xl ml-8 relative bg-gradient-to-r from-gray-900/60 to-gray-800/40 rounded-3xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg overflow-hidden text-white font-sans flex gap-8 items-center
      max-sm:max-w-sm
      max-sm:mx-0
      max-sm:flex-col
      max-sm:items-center
      max-sm:text-center
      max-sm:px-4
      max-sm:gap-4
    ">
      <Tooltip text={assets?.large_text || 'No extra info'}>
        <div className="relative w-40 h-40 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-800/70">
          {loading ? (
            <div className="w-full h-full animate-pulse bg-gray-700 rounded-2xl" />
          ) : (
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover border border-neutral-800 rounded-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
              draggable={false}
            />
          )}
        </div>
      </Tooltip>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="mb-2">
          <span className="inline-block bg-green-900/40 text-green-400 font-semibold px-4 py-1 rounded-full tracking-wide text-xs mb-2 shadow-sm select-none">
            Currently Playing
          </span>
        </div>

        <h2
          className="text-4xl font-black leading-tight truncate mb-1"
          title={name}
        >
          {name}
        </h2>

        {details && (
          <p className="text-gray-200 text-lg truncate mb-1" title={details}>
            {details}
          </p>
        )}

        {state && (
          <p className="text-gray-400 text-base mb-4 truncate" title={state}>
            {state}
          </p>
        )}

        {startedAt && (
          <div className="flex items-center gap-2 text-green-400 font-mono text-base select-none justify-start max-sm:justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{startedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
