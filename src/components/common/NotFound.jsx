import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black p-6 text-teal-400">
      <h1 className="text-7xl font-extrabold mb-4 drop-shadow-sm">404</h1>
      <p className="text-2xl mb-6 max-w-lg text-center drop-shadow-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or is under construction.
      </p>
      <p className="text-teal-300 underline cursor-pointer hover:text-teal-100 transition" onClick={() => window.history.back()}>
        Go Back
      </p>
    </div>
  );
}
