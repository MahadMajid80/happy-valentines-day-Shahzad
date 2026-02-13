"use client";

import { useEffect, useState } from "react";

interface Promise {
  id: number;
  text: string;
  emoji: string;
}

interface PromisesSectionProps {
  promises?: Promise[];
}

const defaultPromises: Promise[] = [
  {
    id: 1,
    text: "I promise to love you unconditionally",
    emoji: "💕",
  },
  {
    id: 2,
    text: "I promise to be your best friend always",
    emoji: "🤝",
  },
  {
    id: 3,
    text: "I promise to support your dreams",
    emoji: "✨",
  },
  {
    id: 4,
    text: "I promise to make you smile every day",
    emoji: "😊",
  },
  {
    id: 5,
    text: "I promise to stand by you forever",
    emoji: "💍",
  },
  {
    id: 6,
    text: "I promise to cherish every moment together",
    emoji: "💖",
  },
];

export const PromisesSection = ({ promises = defaultPromises }: PromisesSectionProps) => {
  const [visiblePromises, setVisiblePromises] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("promises");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      promises.forEach((promise, index) => {
        setTimeout(() => {
          setVisiblePromises((prev) => [...prev, promise.id]);
        }, index * 150);
      });
    }
  }, [isVisible, promises]);

  return (
    <section
      id="promises"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-red-400 mb-16 text-center">
        My Promises to You, Sherry 💍
      </h2>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promises.map((promise) => (
          <div
            key={promise.id}
            className={`bg-gradient-to-br from-pink-900/30 via-rose-900/20 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 ${
              visiblePromises.includes(promise.id)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-5xl mb-4 text-center animate-heart-beat">{promise.emoji}</div>
            <p className="text-white font-handwriting text-lg text-center leading-relaxed">
              {promise.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-pink-400 font-handwriting text-xl md:text-2xl">
          Forever and Always ❤️
        </p>
      </div>
    </section>
  );
};

