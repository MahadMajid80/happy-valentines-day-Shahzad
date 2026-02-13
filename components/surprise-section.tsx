"use client";

import { useState } from "react";

interface SurpriseSectionProps {
  surpriseMessage?: string;
}

const defaultSurpriseMessage = `Sherry, you are my everything, my forever, my always. 
I can't wait to spend the rest of my life making you happy. 
This is just the beginning of our beautiful journey together, Sherry. 
I love you more than words can express. 💍✨`;

export const SurpriseSection = ({
  surpriseMessage = defaultSurpriseMessage,
}: SurpriseSectionProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black">
      <div className="max-w-2xl w-full text-center">
        {!isRevealed ? (
          <div className="space-y-8">
            <div className="text-6xl mb-8 animate-heart-beat">💝</div>
            <h2 className="text-3xl md:text-4xl font-handwriting text-rose-600 mb-6">
              A Special Surprise for You
            </h2>
            <button
              onClick={() => setIsRevealed(true)}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Click to Reveal 💕
            </button>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
            <div className="text-5xl mb-6 animate-heart-beat">💍</div>
            <div className="font-handwriting text-xl md:text-2xl text-gray-800 leading-relaxed whitespace-pre-line">
              {surpriseMessage}
            </div>
            <div className="mt-8 text-4xl animate-float">✨</div>
          </div>
        )}
      </div>
    </section>
  );
};

