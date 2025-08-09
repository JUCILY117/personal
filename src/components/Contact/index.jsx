import { useState } from "react";
import { useLanyard } from "../../../hooks/useLanyard";
import { toast } from "react-toastify";
import ContactLeft from "./ContactLeft";
import ContactRight from "./ContactRight";

export default function Contact() {
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("left");

  const discordId = import.meta.env.VITE_DISCORD_ID;
  const { data, loading } = useLanyard(discordId);
  const username = data?.discord_user?.username || "";
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  const handleChange = (e) =>
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
          description:
            "A visitor has submitted your contact form. Review details below.",
          color: 0x14b8a6,
          fields: [
            { name: "Full Name", value: form.fullName || "No name provided", inline: true },
            { name: "Email", value: form.email || "No email provided", inline: true },
            { name: "Message", value: form.message || "No message provided", inline: false }
          ],
          footer: { text: "Manager God • Powered by Discord Webhooks" },
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
        toast.success("Message sent! I'll get back to you shortly.", { icon: "✉️" });
        setForm({ fullName: "", email: "", message: "" });
      } else {
        toast.error("Failed to send—please try again later.", { icon: "⚠️" });
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`, { icon: "❌" });
    } finally {
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

      <div className="hidden md:flex relative w-full max-w-4xl min-w-[680px] max-h-[580px]
        mx-3 md:mx-10 mt-16 lg:mt-18 flex-row 
        rounded-[2.5rem] shadow-2xl border border-gray-800/70 
        bg-gradient-to-br from-gray-900/85 to-[#212c28]/90 backdrop-blur-2xl">
        <ContactLeft loading={loading} username={username} />
        <ContactRight
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isSubmitting={isSubmitting}
          status={status}
        />
      </div>

      <div className="md:hidden relative w-full max-w-sm mx-4 mt-28 mb-8
        flex flex-col rounded-[1.5rem] shadow-2xl 
        bg-gradient-to-br from-gray-900/85 to-[#212c28]/90 backdrop-blur-2xl overflow-hidden">
        <div className="flex bg-gray-800/20 p-1 m-4 rounded-xl border-2 border-teal-400/50">
          <button
            onClick={() => setActiveTab("left")}
            className={`flex-1 py-3 px-4 font-semibold text-sm rounded-xl transition-all duration-300
              ${activeTab === "left"
                ? "bg-teal-500/90 text-white shadow-lg shadow-teal-500/30 scale-105"
                : "bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.97 3.113C12.75 2.63 11.25 2.63 10.03 3.113L4.03 5.613C2.75 6.125 2.75 7.875 4.03 8.387L10.03 10.887C11.25 11.37 12.75 11.37 13.97 10.887L19.97 8.387C21.25 7.875 21.25 6.125 19.97 5.613L13.97 3.113Z"/>
                <path d="M4 12L10 9L16 12L20 10.5V16C20 17.1 19.1 18 18 18H6C4.9 18 4 17.1 4 16V12Z"/>
              </svg>
              Discord
            </span>
          </button>
          <button
            onClick={() => setActiveTab("right")}
            className={`flex-1 py-3 px-4 font-semibold text-sm rounded-xl transition-all duration-300
              ${activeTab === "right"
                ? "bg-teal-500/90 text-white shadow-lg shadow-teal-500/30 scale-105"
                : "bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
              </svg>
              Contact
            </span>
          </button>
        </div>

        <div className="flex-1 w-full min-h-0">
          {activeTab === "left" && (
            <div className="animate-fadeIn w-full h-full">
              <ContactLeft loading={loading} username={username} />
            </div>
          )}
          {activeTab === "right" && (
            <div className="animate-fadeIn w-full h-full">
              <ContactRight
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                isSubmitting={isSubmitting}
                status={status}
              />
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.35s ease;
          }
          body { overflow: hidden !important; }
        `}
      </style>
    </div>
  );
}
