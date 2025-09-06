import { useState, useEffect, useRef } from 'react';

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const passOK = sessionStorage.getItem('secretFormAuth') === 'true';
    if (passOK) {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_SECRET_FORM_PASSWORD;
    if (password === correctPassword) {
      sessionStorage.setItem('secretFormAuth', 'true');
      onAuthenticated();
    } else {
      setError('❌ Incorrect password');
    }
  }

  return (
    <div className="pt-28 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#222d24]/90 via-[#1e2524]/85 to-[#23314a]/90 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          🔒 Enter Password
        </h2>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            ref={inputRef}
            className="w-full px-4 py-2 rounded-xl bg-transparent border border-teal-400/40 text-white focus:ring-2 focus:ring-teal-400 focus:outline-none pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-teal-400 hover:text-teal-300 focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l22 22" />
                <path d="M17.94 17.94A10.77 10.77 0 0112 19c-5 0-9-4-9-7a8 8 0 015.58-7.86" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            )}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-400 hover:bg-teal-300 text-gray-900 font-extrabold rounded-xl shadow transition hover:scale-105 cursor-pointer"
        >
          Unlock Form
        </button>
      </form>
    </div>
  );
}
