import { useContext } from 'react';
import { EasterEggContext } from '../src/context/EasterEggContext';

export default function useEasterEgg() {
  return useContext(EasterEggContext);
}
