import React, { createContext, useState, useEffect } from 'react';

export const EasterEggContext = createContext();

export function EasterEggProvider({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem('eggUnlocked') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('eggUnlocked', unlocked);
  }, [unlocked]);

  return (
    <EasterEggContext.Provider value={{ unlocked, setUnlocked }}>
      {children}
    </EasterEggContext.Provider>
  );
}
