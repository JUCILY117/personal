export default function ContactRight({
  form,
  handleChange,
  handleSubmit,
  loading,
  isSubmitting,
  status
}) {
  return (
    <form
      className="flex-[1.55] min-w-[320px] flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-8 bg-gradient-to-br from-[#222d24]/90 via-[#1e2524]/85 to-[#23314a]/90 rounded-r-[2.5rem] max-sm:rounded-b-[2.5rem] max-sm:rounded-tr-none"
      onSubmit={handleSubmit}
      style={{ minHeight: 460, minWidth: 340 }}
    >
      <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow">
        Drop a message
      </h2>

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
          className="self-start mt-2 px-14 py-3 bg-teal-400 hover:bg-teal-300 text-gray-800 font-extrabold rounded-xl shadow-lg transition hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
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
  );
}
