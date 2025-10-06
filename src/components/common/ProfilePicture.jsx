import { useState, useEffect } from "react";
import { useLanyard } from "../../../hooks/useLanyard";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export default function ProfilePicture({ size = 48 }) {
  const { data, loading, error } = useLanyard(DISCORD_ID);
  const [imgSrc, setImgSrc] = useState(null);
  const [decorationSrc, setDecorationSrc] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (loading || error || !data) return;

    const user = data.discord_user;
    const promises = [];

    if (user?.id && user?.avatar) {
      const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`;
      const avatarImg = new Image();
      avatarImg.src = avatarUrl;
      promises.push(avatarImg.decode());
      setImgSrc(avatarUrl);
    }

    if (user?.avatar_decoration_data?.asset) {
      const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`;
      const decoImg = new Image();
      decoImg.src = decorationUrl;
      promises.push(decoImg.decode());
      setDecorationSrc(decorationUrl);
    }

    Promise.all(promises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true));
  }, [data, loading, error, size]);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      {!imagesLoaded && (
        <div
          className="absolute inset-0 rounded-full bg-gray-700/50 animate-pulse"
          style={{ width: size, height: size }}
        />
      )}

      {imgSrc && (
        <img
          src={imgSrc}
          alt="Discord Profile"
          width={size}
          height={size}
          draggable={false}
          loading="lazy"
          style={{
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
            userSelect: "none",
            borderRadius: "9999px",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        />
      )}

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
            transform: "translate(-50%, -50%) scaleX(1.3)",
            transformOrigin: "center",
            zIndex: 10,
            objectFit: "fill",
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        />
      )}
    </div>
  );
}