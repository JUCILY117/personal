import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProfilePicture from '../common/ProfilePicture';
import MobileSidebarMenu from './MobileSidebarMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const holdTimerRef = useRef(null);
  const holdTriggeredRef = useRef(false);

  function handleProfilePictureMouseDown(e) {
    holdTriggeredRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      holdTriggeredRef.current = true;
      navigate('/form');
    }, 1200);
  }

  function handleProfilePictureMouseUp(e) {
    clearTimeout(holdTimerRef.current);
  }

  function handleProfilePictureMouseLeave(e) {
    clearTimeout(holdTimerRef.current);
  }

  function handleProfilePictureClick(e) {
    setMenuOpen(false);
    if (holdTriggeredRef.current) {
      holdTriggeredRef.current = false;
      return;
    }
    navigate('/');
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          className="focus:outline-none cursor-pointer"
          title="Home"
          style={{ background: 'transparent', padding: 0, border: 'none' }}
          onClick={handleProfilePictureClick}
          onMouseDown={handleProfilePictureMouseDown}
          onMouseUp={handleProfilePictureMouseUp}
          onMouseLeave={handleProfilePictureMouseLeave}
          onTouchStart={handleProfilePictureMouseDown}
          onTouchEnd={handleProfilePictureMouseUp}
        >
          <ProfilePicture size={64} />
        </button>

        <div className="hidden text-xl md:flex space-x-8 text-teal-400 font-semibold">
          <Link to="about" className="hover:underline">About</Link>
          <Link to="projects" className="hover:underline">Projects</Link>
          <Link to="skills" className="hover:underline">Skills</Link>
          <Link to="contact" className="hover:underline">Contact</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-teal-400 focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      <MobileSidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}
