import { useState, useEffect } from 'react';
import LastActivityCard from './LastActivityCard';

export default function LastActivityContainer() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    async function fetchLastActivity() {
      try {
        const response = await fetch('http://localhost:3001/api/getLastActivity');
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
      <div className="w-full h-[calc(100vh-6rem)] flex justify-center items-center px-6">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-teal-400 opacity-90"
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
          <span className="mt-3 text-teal-300 text-base font-medium">
            Loading last activity...
          </span>
        </div>
      </div>
    );
  }
  
  return <LastActivityCard activity={activity} />;
}
