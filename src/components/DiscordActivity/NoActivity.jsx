export default function NoActivity() {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 bg-gradient-to-br from-purple-900/60 via-transparent to-gray-900/60 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden max-w-xl mx-auto">
          <div className="absolute inset-0 pointer-events-none flex flex-wrap justify-center items-center opacity-15">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${12.5 * i}%`,
                  top: `${(i % 2) * 35 + 30}%`,
                  animationDelay: `${i * 0.22}s`,
                }}
                className="absolute text-7xl text-indigo-500/50 animate-[float_4s_ease-in-out_infinite]"
              >
                {["🎼", "🎶", "🎵", "🎷", "🎸", "🎺", "🎤", "🎻"][i % 8]}
              </span>
            ))}
          </div>

          <div className="relative z-10 mb-8 text-indigo-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mx-auto"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.17 14.83a4 4 0 010-5.66l1.41-1.41M14.83 9.17a4 4 0 010 5.66l-1.41 1.41"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.46 15.54l-2.12 2.12a3 3 0 104.24 4.24l2.12-2.12M15.54 8.46l2.12-2.12a3 3 0 10-4.24-4.24l-2.12 2.12"
              />
            </svg>
          </div>

          <div className="relative z-10 text-center px-6">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-4">
              Offline
            </h2>
            <p className="text-indigo-300 max-w-md mx-auto text-lg leading-relaxed">
              I’m currently offline or in stealth mode, but meanwhile you can&nbsp;
              <a
                href="#projects"
                className="text-emerald-400 hover:underline font-semibold"
              >
                check out my projects
              </a>
              ,&nbsp;
              <a
                href="https://github.com/JUCILY117"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-semibold"
              >
                visit my GitHub
              </a>
              , or&nbsp;
              <a
                href="#contact"
                className="text-yellow-400 hover:underline font-semibold"
              >
                drop me a message
              </a>
              .
            </p>
          </div>
        </div>
  );
}
