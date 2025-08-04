export default function ProjectCard({ project = {} }) {
  const { title, image, description, githubLink, previewLink, tags } = project;

  return (
    <div className="relative group bg-gradient-to-br from-[#192a37] via-[#232942]/70 to-[#0e1d23]/90 rounded-3xl shadow-2xl min-w-[290px] max-w-[320px] transition-transform hover:scale-105 overflow-hidden border-2 border-teal-800/30">
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-teal-400 opacity-20 blur-2xl group-hover:blur-3xl transition-blur duration-500 z-0"></div>
      <div className="absolute -bottom-6 right-3 w-24 h-16 bg-fuchsia-400 opacity-15 blur-2xl rotate-12 group-hover:blur-3xl transition-blur duration-500 z-0"></div>

      <img
        src={image}
        alt={`${title} thumbnail`}
        className="rounded-2xl mt-5 mx-auto w-[92%] h-36 object-cover shadow-lg shadow-teal-500/10 relative z-10"
      />
      <div className="p-5 pt-4 relative z-10 flex flex-col gap-2">
        <h3 className="text-lg font-extrabold text-teal-300 group-hover:text-teal-400 transition">
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-1 line-clamp-3">{description}</p>
        <div className="flex gap-3 flex-wrap mb-2">
          {Array.isArray(tags) &&
            tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-[3px] rounded-full text-xs tracking-wider font-semibold bg-[#17bab8]/15 text-teal-300 border border-teal-500/20"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex gap-5 items-center mt-3">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-3 hover:text-teal-400 text-teal-300 font-bold"
              title="View on GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.09 3.29 9.396 7.861 10.911.575.11.786-.248.786-.552 0-.271-.01-1.16-.015-2.104-3.197.696-3.872-1.543-3.872-1.543-.523-1.33-1.278-1.684-1.278-1.684-1.045-.715.08-.701.08-.701 1.157.081 1.766 1.188 1.766 1.188 1.028 1.762 2.698 1.254 3.356.959.104-.744.402-1.255.732-1.543-2.553-.292-5.238-1.277-5.238-5.677 0-1.254.45-2.28 1.188-3.083-.119-.293-.515-1.476.113-3.08 0 0 .968-.31 3.177 1.177A11.058 11.058 0 0 1 12 6.844c.98.004 1.967.132 2.89.387 2.206-1.486 3.173-1.177 3.173-1.177.63 1.605.234 2.788.115 3.08.74.803 1.185 1.829 1.185 3.083 0 4.409-2.691 5.382-5.252 5.669.413.354.78 1.052.78 2.122 0 1.531-.014 2.762-.014 3.14 0 .307.207.666.792.552C20.715 21.393 24 17.09 24 12A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </a>
          )}
          {previewLink && (
            <a
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-3 hover:text-teal-400 text-teal-300 font-bold"
              title="Live Preview"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-teal-400 via-fuchsia-400 to-purple-700 opacity-10 rounded-full blur-2xl z-0"></div>
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-300/70 transition-border"></div>
    </div>
  );
}
