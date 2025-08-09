import ProfilePicture from "../common/ProfilePicture";

export default function ContactLeft({ loading, username }) {
  return (
    <div className="flex-[1.25] min-w-[320px] max-w-[420px] flex flex-col justify-center items-center 
        p-8 md:p-12 lg:p-16 max-sm:py-8 max-sm:px-5">
      <div className="relative flex flex-col items-center w-full">
        <span className="inline-block bg-teal-400/20 text-teal-400 font-bold uppercase tracking-wide rounded-lg 
            mb-7 text-sm py-1 px-6 shadow shadow-teal-400/10">
          DISCORD
        </span>
        <div className="relative mb-0.5">
          <div className="absolute inset-0 w-full h-full rounded-full blur-xl bg-teal-400/20 scale-105 z-0" />
          <div className="relative z-10">
            <ProfilePicture size={256} />
          </div>
        </div>
        <div className="mt-7 flex flex-col items-center w-full min-w-[220px]">
          {loading ? (
            <>
              <div className="h-8 w-32 bg-gray-700 rounded-full animate-pulse" />
              <div className="h-5 w-40 bg-gray-800 rounded-lg animate-pulse" />
            </>
          ) : (
            <>
              <p className="text-[1.47rem] font-extrabold text-white drop-shadow mb-2">{username}</p>
              <span className="text-neutral-500 text-base font-normal mb-2 text-center">
                Might not always be online, Use Form Instead
              </span>
            </>
          )}
        </div>
        <div className="w-full mt-1 flex flex-col items-center text-center">
          {loading ? (
            <div className="h-5 w-44 bg-gray-800 rounded-lg animate-pulse mb-2" />
          ) : (
            <p className="font-medium text-gray-200">
              <a
                href={
                  "https://mail.google.com/mail/?view=cm&fs=1&to=m.aniket1702@gmail.com" +
                  "&su=" + encodeURIComponent("Contact from your Website") +
                  "&body=" + encodeURIComponent("Hi, I came across your portfolio and would like to get in touch.")
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline transition"
              >
                m.aniket1702@gmail.com
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
