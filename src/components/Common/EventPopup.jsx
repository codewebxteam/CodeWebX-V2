import React, { useState, useEffect } from "react";

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Har refresh par dikhane ke liye direct trigger
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setShowAnimation(true), 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 transition-opacity duration-300 ${
        showAnimation ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Container with 4:5 Aspect Ratio (for 1080x1350) */}
      <div
        className={`relative w-full max-w-[450px] aspect-[4/5] max-h-[90vh] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(163,230,53,0.2)] transform transition-all duration-500 ease-out ${
          showAnimation ? "scale-100 translate-y-0" : "scale-90 translate-y-10"
        }`}
      >
        {/* Close Button - Glassy style */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 bg-black/50 hover:bg-lime-400 hover:text-black text-white rounded-full backdrop-blur-md border border-white/10 transition-all duration-300"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Full Clickable Image */}
        <a
          href="https://codewebx.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full block group"
        >
          <img
            // Yahan apni 1080x1350 image ka URL dalein
            src="https://ik.imagekit.io/hello11/CodeWebX%20Technologies%20(1).png"
            alt="Full Event Poster"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </a>
      </div>
    </div>
  );
};

export default EventPopup;
