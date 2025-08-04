import { useState } from "react";
import { useLanyard } from "../../../hooks/useLanyard";
import ProfilePicture from "../common/ProfilePicture";
import { toast } from 'react-toastify';
import { s } from "framer-motion/client";

export default function Contact() {
  const [form, setForm] = useState({ email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discordId = import.meta.env.VITE_DISCORD_ID;
  const { data, loading } = useLanyard(discordId);
  const username = data?.discord_user?.username || "";

  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  const handleChange = e =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    embeds: [
      {
        author: {
          name: form.fullName || "Anonymous",
          icon_url: data?.discord_user?.avatar_url
        },
        title: "New Contact Form Submission",
        description: "A visitor has submitted your contact form. Review details below.",
        color: 0x14b8a6,
        fields: [
          { name: "Full Name", value: form.fullName || "No name provided", inline: true },
          { name: "Email",     value: form.email    || "No email provided", inline: true },
          { name: "Message",   value: form.message  || "No message provided", inline: false }
        ],
        footer: {
          text: "Manager God • Powered by Discord Webhooks",
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      toast.success("Message sent! I'll get back to you shortly.", { icon: '✉️' });
      setForm({ fullName: "", email: "", message: "" });
    } else {
      toast.error("Failed to send—please try again later.", { icon: '⚠️' });
    }
  } catch (err) {
    toast.error(`Error: ${err.message}`, { icon: '❌' });
  }finally{
    setIsSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute left-[26%] top-[18%] blur-[100px] opacity-40" width={270} height={320}>
          <ellipse cx="125" cy="165" rx="120" ry="112" fill="#2dd4bf" fillOpacity="0.16" />
        </svg>
        <svg className="absolute right-[7%] bottom-[15%] blur-[90px] opacity-40" width={220} height={260}>
          <ellipse cx="110" cy="130" rx="100" ry="90" fill="#2dd4bf" fillOpacity="0.12" />
        </svg>
        <svg className="absolute left-1/2 top-[35%] -translate-x-1/2 blur-[60px] opacity-70" width={100} height={120}>
          <ellipse cx="52" cy="70" rx="38" ry="45" fill="#14b8a6" fillOpacity="0.13" />
        </svg>
      </div>
      <div className="relative w-full max-w-4xl min-w-[680px] max-h-[580px] mx-3 md:mx-10 mt-16 lg:mt-18 flex flex-col md:flex-row rounded-[2.5rem] shadow-2xl border border-gray-800/70 bg-gradient-to-br from-gray-900/85 to-[#212c28]/90 backdrop-blur-2xl">
        <div className="flex-[1.25] min-w-[320px] max-w-[420px] flex flex-col justify-center items-center p-8 md:p-12 lg:p-16">
          <div className="relative flex flex-col items-center w-full">
            <span className="inline-block bg-teal-400/20 text-teal-400 font-bold uppercase tracking-wide rounded-lg mb-7 text-sm py-1 px-6 shadow shadow-teal-400/10">
              DISCORD
            </span>
            <div className="relative mb-0.5">
              <div className="absolute inset-0 w-full h-full rounded-full blur-xl bg-teal-400/20 scale-105 z-0 mix-blend-normal" />
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
                  <p className="text-[1.47rem] font-extrabold text-white drop-shadow mb-2">
                    {username}
                  </p>
                  <span className="text-neutral-500 text-base font-normal mb-2 text-center">
                    Might not always be online, Use Form Instead
                  </span>
                </>
              )}
            </div>
            <div className="w-full mt-1 flex flex-col items-center text-center">
              {loading ? (
                <>
                  <div className="h-5 w-44 bg-gray-800 rounded-lg animate-pulse mb-2" />
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-200">
                    <a href={
                        "https://mail.google.com/mail/?view=cm&fs=1&to=m.aniket1702@gmail.com" +
                        "&su=" + encodeURIComponent("Contact from your Website") +
                        "&body=" + encodeURIComponent("Hi, I came across your portfolio and would like to get in touch.")
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline transition">
                      m.aniket1702@gmail.com
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <form
          className="flex-[1.55] min-w-[320px] flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-8 bg-gradient-to-br from-[#222d24]/90 via-[#1e2524]/85 to-[#23314a]/90 rounded-r-[2.5rem]"
          onSubmit={handleSubmit}
          style={{ minHeight: 460, minWidth: 340 }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow">Drop a message</h2>
          <label className="flex flex-col gap-2 text-gray-300 font-semibold">
            Full Name
            {loading ? (
              <div className="h-12 w-full min-w-[220px] rounded-xl bg-gray-800 animate-pulse" />
            ) : (
              <input
                type="text"
                name="fullName"
                value={form.fullName || ""}
                onChange={handleChange}
                required
                placeholder="Have a name?"
                className="rounded-xl px-5 py-2 text-md text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                minLength={2}
              />
            )}
          </label>

          <label className="flex flex-col gap-2 text-gray-300 font-semibold">
            Your Email
            {loading ? (
              <div className="h-12 w-full min-w-[220px] rounded-xl bg-gray-800 animate-pulse" />
            ) : (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="username@domain"
                className="rounded-xl px-5 py-2 text-md text-white bg-transparent border border-teal-400/40 focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                minLength={5}
              />
            )}
          </label>

          <label className="flex flex-col gap-2 text-gray-300 font-semibold">
            Message
            {loading ? (
              <div className="h-36 w-full min-w-[220px] rounded-xl bg-gray-800 animate-pulse" />
            ) : (
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Write your message here…"
                className="rounded-xl px-5 py-4 text-md text-white bg-transparent border border-teal-400/40 resize-y focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                minLength={3}
              />
            )}
          </label>

          {loading ? (
            <div className="h-12 w-36 min-w-[120px] rounded-xl bg-gray-800 animate-pulse self-start" />
          ) : (
            <button
                type="submit"
                className={`self-start mt-2 px-14 py-3 bg-teal-400 hover:bg-teal-300 text-gray-800 font-extrabold rounded-xl shadow-lg transition hover:scale-105 cursor-pointer flex items-center justify-center gap-2`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </button>
          )}
          {status && <p className="text-teal-400 mt-2">{status}</p>}
        </form>
      </div>
      <style>{`body { overflow: hidden !important; }`}</style>
    </div>
  );
}
