import { useState } from 'react';

export default function ActivityImage({ 
  src, 
  alt, 
  className = "",
  fallbackSrc = "/default-album.png"
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (!src || imageError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-xs">No Image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`absolute inset-0 bg-gray-800 animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
}
