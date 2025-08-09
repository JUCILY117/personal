import { Link } from 'react-router-dom';

export default function MobileSidebarMenu({ open, onClose }) {
  return (
    <div>
      <div
        className={`fixed inset-0 z-[70] bg-black/30 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside
        className={`fixed top-0 right-0 z-[99] w-72 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 shadow-2xl rounded-l-2xl p-8 flex flex-col items-center justify-center space-y-8
        transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-teal-400 transition-colors p-2 rounded-full"
          aria-label="Close"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col items-center space-y-8 text-xl font-semibold text-teal-400">
          <Link to="about" className="hover:underline" onClick={onClose}>About</Link>
          <Link to="projects" className="hover:underline" onClick={onClose}>Projects</Link>
          <Link to="skills" className="hover:underline" onClick={onClose}>Skills</Link>
          <Link to="contact" className="hover:underline" onClick={onClose}>Contact</Link>
        </nav>
      </aside>
    </div>
  );
}
