import { useState, useEffect } from 'react';
import { useLanyard } from '../../../hooks/useLanyard';

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export default function ProfilePicture({ size = 48 }) {
  const { data, loading, error } = useLanyard(DISCORD_ID);
  const [imgSrc, setImgSrc] = useState(null);
  const [decorationSrc, setDecorationSrc] = useState(null);

  useEffect(() => {
    if (loading || error || !data) return;

    const user = data.discord_user;
    if (user?.id && user?.avatar) {
      const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`;
      setImgSrc(url);
    }

    if (user?.avatar_decoration_data?.asset) {
      const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`;
      setDecorationSrc(decorationUrl);
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
    <div
      style={{ width: size, height: size }}
      className="relative"
    >
      <img
        src={imgSrc}
        alt="Discord Profile"
        className="rounded-full shadow-md"
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {decorationSrc && (
    <img
      src={decorationSrc}
      alt="Avatar Decoration"
      className="absolute pointer-events-none"
      style={{
  width: `${size * 1.35}px`,
  height: `${size * 1.35}px`,
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%) scaleX(1.3)", // stretch width by scaleX
  transformOrigin: "center",
  zIndex: 10,
  objectFit: "fill", // ensures image can stretch
}}

    />
  )}
    </div>
  );
}