import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSquareGithub } from "react-icons/fa6";
import DiscordActivity from '../DiscordActivity';

export default function Hero() {
  const [githubUrl, setGithubUrl] = useState(null);

  useEffect(() => {
    async function fetchDiscordProfile() {
      try {
        const response = await fetch(`https://dcdn.dstn.to/profile/${import.meta.env.VITE_DISCORD_ID}`);
        const data = await response.json();

        const githubAccount = data.connected_accounts.find(
          (account) => account.type === 'github'
        );

        if (githubAccount && githubAccount.name) {
          setGithubUrl(`https://github.com/${githubAccount.name}`);
        }
      } catch (error) {
        console.error('Failed to fetch Discord profile:', error);
      }
    }

    fetchDiscordProfile();
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-12 gap-10 lg:gap-20">

        <div className="flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2 space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Aayu
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-teal-400">
            Full Stack Developer
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Building high-performance applications with React, APIs, and real-time integrations.
          </p>

          <div className="flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start pt-4">
            <Link to="/projects">
              <button className="px-6 py-2 bg-teal-400 hover:bg-white text-gray-900 font-extrabold rounded-md transition-all duration-200 cursor-pointer">
                My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-2 text-teal-400 hover:bg-teal-400 hover:text-gray-900 font-extrabold rounded-md transition-all duration-200 cursor-pointer">
                Contact Me
              </button>
            </Link>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-teal-400 hover:text-white transition-all duration-200"
              >
                <FaSquareGithub size={42} />
              </a>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <DiscordActivity />
          </div>
        </div>

      </div>
    </section>
  );
}
