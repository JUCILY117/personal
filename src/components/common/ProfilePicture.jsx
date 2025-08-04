import { useState, useEffect } from 'react';
import { useLanyard } from '../../../hooks/useLanyard';

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export default function ProfilePicture({ size = 48 }) {
  const { data, loading, error } = useLanyard(DISCORD_ID);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (loading || error || !data) return;

    const user = data.discord_user;
    if (user?.id && user?.avatar) {
      const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`;
      setImgSrc(url);
    }
  }, [data, loading, error, size]);

  if (loading || !imgSrc) {
    return (
      <div
        className={`rounded-full bg-gray-700 animate-pulse`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt="Discord Profile"
      className="rounded-full shadow-md border-4 border-teal-400"
      width={size}
      height={size}
      loading="lazy"
      draggable={false}
      style={{ userSelect: 'none' }}
    />
  );
}