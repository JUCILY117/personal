import { useEffect, useRef } from 'react';
import useEasterEgg from '../../../utils/useEasterEgg';

const secretString = import.meta.env.VITE_SECRET_SEQUENCE || '';
const SECRET = secretString.split(',').map(s => s.trim()).filter(Boolean);

export default function EasterEgg() {
  const { unlocked, setUnlocked } = useEasterEgg();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile || unlocked) return;

    let idx = 0;
    function onKey(e) {
      if (unlocked) return;
      if (e.key.toLowerCase() === SECRET[idx]) {
        idx++;
        if (idx === SECRET.length) {
          setUnlocked(true);
        }
      } else {
        idx = 0;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unlocked, setUnlocked, isMobile]);

  useEffect(() => {
    if (!isMobile || unlocked) return;

    function onTouchStart(e) {
      const touchY = e.touches[0].clientY;
      if (touchY > 100) return;

      tapCountRef.current++;
      clearTimeout(tapTimerRef.current);
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 500);

      if (tapCountRef.current === 3) {
        setUnlocked(true);
        tapCountRef.current = 0;
      }
    }

    window.addEventListener('touchstart', onTouchStart);
    return () => window.removeEventListener('touchstart', onTouchStart);
  }, [unlocked, setUnlocked, isMobile]);

  return null;
}
