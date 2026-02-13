"use client";

import { useEffect, useState } from "react";

interface Reason {
  id: number;
  text: string;
  emoji: string;
}

interface WhyILoveYouSectionProps {
  reasons?: Reason[];
}

const defaultReasons: Reason[] = [
  { id: 1, text: "Your beautiful smile", emoji: "😊" },
  { id: 2, text: "Your kindness and compassion", emoji: "💝" },
  { id: 3, text: "The way you care for others", emoji: "🤗" },
  { id: 4, text: "Your sense of humor", emoji: "😄" },
  { id: 5, text: "Your intelligence and wisdom", emoji: "🧠" },
  { id: 6, text: "How you make me feel special", emoji: "✨" },
  { id: 7, text: "Your beautiful heart", emoji: "💖" },
  { id: 8, text: "The way you love me", emoji: "💕" },
];

export const WhyILoveYouSection = ({ reasons = defaultReasons }: WhyILoveYouSectionProps) => {
  const [visibleReasons, setVisibleReasons] = useState<number[]>([]);
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

    const section = document.getElementById("why-i-love-you");
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
      reasons.forEach((reason, index) => {
        setTimeout(() => {
          setVisibleReasons((prev) => [...prev, reason.id]);
        }, index * 150);
      });
    }
  }, [isVisible, reasons]);

  return (
    <section
      id="why-i-love-you"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-handwriting text-rose-600 mb-16 text-center">
        Why I Love You, Sherry 💝
      </h2>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
              visibleReasons.includes(reason.id)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-4xl mb-3 text-center">{reason.emoji}</div>
            <p className="text-center text-gray-800 font-handwriting text-lg">
              {reason.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

