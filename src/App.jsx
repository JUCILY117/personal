import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import NotFound from './components/common/NotFound';
import MobileWarning from './components/common/MobileWarning';
import { ToastContainer } from 'react-toastify';
import { EasterEggProvider } from './context/EasterEggContext';
import EasterEgg from './components/EasterEgg';
import FormPage from './components/ProtectedMainForm';
import useEasterEgg from '../utils/useEasterEgg';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function AppContent() {
  const [isMobile, setIsMobile] = useState(false);
  const { unlocked } = useEasterEgg();

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        {unlocked && <Route path="/form" element={<FormPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {isMobile && <MobileWarning />}
    </div>
  );
}

export default function App() {
  return (
    <EasterEggProvider>
      <EasterEgg />
      <AppContent />
    </EasterEggProvider>
  );
}
