"use client";

import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

export const ForeverMessageSection = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartArray: FloatingHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setHearts(heartArray);

    const interval = setInterval(() => {
      setHearts((prev) =>
        prev.map((heart) => ({
          ...heart,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-3xl animate-float-up"
            style={{
              left: `${heart.x}%`,
              bottom: "-50px",
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 mb-8 animate-fade-in-up">
          This is just the beginning of our forever 💍
        </h2>

        <p className="text-2xl md:text-3xl text-rose-600 font-handwriting mb-12 animate-fade-in-up">
          I love you more than words can say, Sherry
        </p>

        <div className="text-6xl animate-heart-beat">💕</div>

        <div className="mt-16 space-y-4 text-lg text-white font-handwriting">
          <p>Forever yours,</p>
          <p className="text-2xl text-rose-600">Your Love ❤️</p>
          <p className="text-xl text-pink-400 mt-4">For Sherry, with all my heart</p>
        </div>
      </div>
    </section>
  );
};

