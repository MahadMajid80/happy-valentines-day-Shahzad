"use client";

import { useEffect, useState } from "react";

interface Quote {
  id: number;
  text: string;
  author?: string;
}

interface RomanticQuotesSectionProps {
  quotes?: Quote[];
}

const defaultQuotes: Quote[] = [
  {
    id: 1,
    text: "You are my today and all of my tomorrows.",
  },
  {
    id: 2,
    text: "In your smile, I see something more beautiful than the stars.",
  },
  {
    id: 3,
    text: "Every love story is beautiful, but ours is my favorite.",
  },
  {
    id: 4,
    text: "You are my heart, my life, my one and only thought.",
  },
  {
    id: 5,
    text: "I fell in love with you because of the million things you never knew you were doing.",
  },
];

export const RomanticQuotesSection = ({ quotes = defaultQuotes }: RomanticQuotesSectionProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("romantic-quotes");
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
    if (isVisible && quotes.length > 1) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
          setFadeIn(true);
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible, quotes.length]);

  if (!isVisible) return null;

  return (
    <section
      id="romantic-quotes"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-500/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-red-400 mb-16">
          Words From My Heart 💌
        </h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <div
            className={`transition-all duration-500 ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-pink-500/30 shadow-2xl">
              <div className="text-6xl mb-6 animate-heart-beat">💝</div>
              <p className="text-white font-handwriting text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4">
                &ldquo;{quotes[currentQuoteIndex]?.text}&rdquo;
              </p>
              {quotes[currentQuoteIndex]?.author && (
                <p className="text-pink-400 font-handwriting text-lg mt-6">
                  — {quotes[currentQuoteIndex].author}
                </p>
              )}
            </div>
          </div>
        </div>

        {quotes.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFadeIn(false);
                  setTimeout(() => {
                    setCurrentQuoteIndex(index);
                    setFadeIn(true);
                  }, 300);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex
                    ? "w-8 bg-pink-500"
                    : "w-2 bg-pink-500/30"
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

