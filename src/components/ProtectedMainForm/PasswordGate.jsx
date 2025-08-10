import { useState, useEffect } from 'react';

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const passOK = sessionStorage.getItem('secretFormAuth') === 'true';
    if (passOK) {
      onAuthenticated();
    }
  }, [onAuthenticated]);

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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-2 rounded-xl bg-transparent border border-teal-400/40 text-white focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-400 hover:bg-teal-300 text-gray-900 font-extrabold rounded-xl shadow transition hover:scale-105"
        >
          Unlock Form
        </button>
      </form>
    </div>
  );
}
