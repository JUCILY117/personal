import { useState, useEffect } from 'react';
import LastActivityCard from './LastActivityCard';

export default function LastActivityContainer() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    async function fetchLastActivity() {
      try {
        const response = await fetch('/api/getLastActivity');
        if (response.ok) {
          const data = await response.json();
          setActivity(data);
        } else {
          console.error('Failed to fetch last activity:', response.status);
        }
      } catch (e) {
        console.error('Error fetching last activity:', e);
      }
    }

    fetchLastActivity();
  }, []);

  if (!activity) {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <svg
            className="animate-spin h-9 w-9 text-teal-400 opacity-90"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-30"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            />
            <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v5a3 3 0 00-3 3H4z"
            />
        </svg>
        <span className="ml-3 text-teal-300 text-xl font-semibold">
            Loading last activity...
        </span>
        </div>
    );
    }

  return <LastActivityCard activity={activity} />;
}
