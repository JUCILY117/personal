import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmoothSpotifyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(src);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setDisplaySrc(src);
      setLoaded(true);
    };

    setLoaded(false);
  }, [src]);

  return (
    <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
      {!loaded && (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gray-800/50 backdrop-blur-md rounded-2xl animate-pulse"
        />
      )}
      
      <AnimatePresence mode="wait">
        {loaded && (
          <motion.img
            key={displaySrc}
            src={displaySrc}
            alt={alt}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05, y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98, y: -10 }}
            transition={{ duration: 0.6, ease: [0.45, 0, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
