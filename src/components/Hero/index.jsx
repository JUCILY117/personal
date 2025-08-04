import { Link } from 'react-router-dom';
import DiscordActivity from '../DiscordActivity';

export default function Hero() {
  return (
    <section className="w-full h-screen flex flex-col lg:flex-row items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6 md:px-12 lg:px-40">
      <div className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-4 py-8 lg:py-0">
        <div className="space-y-5 max-w-md lg:max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Aayu
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-teal-400">
            Full Stack Developer
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
            Building high-performance applications with React, APIs, and real-time integrations.
          </p>
          <button className="mt-3 px-6 sm:px-8 py-2 sm:py-3 bg-teal-400 hover:bg-teal-300 text-gray-800 font-extrabold text-black rounded-lg transition-transform transform hover:scale-105">
            <Link to="/projects" smooth={true} duration={500}>
            View My Work
            </Link>
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center pl-0 lg:pl-4 py-8 lg:py-0">
        <div className="w-full max-w-xl mt-6">
          <DiscordActivity />
        </div>
      </div>
    </section>
  );
}
