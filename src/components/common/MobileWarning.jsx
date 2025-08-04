import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0e1c1b] via-[#111e25] to-[#14232e] flex flex-col justify-center items-center p-6 text-center z-50">
        <ProfilePicture size={256} />
      <p className="text-teal-400 font-semibold text-lg md:text-xl leading-relaxed max-w-md drop-shadow-lg mt-10">
        Sorry, you can&apos;t visit my website on <span className="uppercase font-extrabold text-teal-300">mobile or tablet</span> devices yet, cause my lazy ass hasn&apos;t made it responsive.
      </p>
      <p className="mt-6 font-mono text-sm text-teal-200 tracking-wide">
        (But hey, feel free to check it out on desktop, hehehehehe)
      </p>
    </div>
  );
}
