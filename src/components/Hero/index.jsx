import { Link } from 'react-router-dom';
import { FaSquareGithub } from "react-icons/fa6";
import DiscordActivity from '../DiscordActivity';

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 sm:px-6 md:px-12 lg:px-40 py-8">
      <div className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-4">
        <div className="space-y-5 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Aayu
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-teal-400">
            Full Stack Developer
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed px-0">
            Building high-performance applications with React, APIs, and real-time integrations.
          </p>

          <div className="flex flex-row gap-3 items-center justify-center lg:justify-start mt-3 px-0">
            <Link to="/projects">
              <button className="px-5 py-2 bg-teal-400 hover:bg-white text-gray-900 font-extrabold rounded-md transition-transform text-center cursor-pointer">
                My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-5 py-2 bg-none hover:bg-teal-400 text-teal-400 hover:text-gray-900 font-extrabold rounded-md transition-transform  text-center cursor-pointer">
                Contact Me
              </button>
            </Link>

            <a
              href="https://github.com/JUCILY117"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform"
              aria-label="GitHub"
            >
              <FaSquareGithub size={42} className="text-teal-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center pl-0 lg:pl-4 mt-8 lg:mt-0">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-0">
          <DiscordActivity />
        </div>
      </div>
    </section>
  );
}
