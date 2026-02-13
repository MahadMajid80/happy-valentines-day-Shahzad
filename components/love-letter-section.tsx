"use client";

import { useEffect, useRef, useState } from "react";

interface LoveLetterSectionProps {
  letter?: string;
}

const defaultLetter = `My Dearest Sherry,

As I sit here writing this, my heart is filled with so much love and gratitude for having you in my life. Every day with you feels like a dream come true, and I find myself falling in love with you more and more with each passing moment.

Sherry, your smile lights up my world, your kindness touches my soul, and your love completes me in ways I never knew were possible. You are my best friend, my partner, my everything.

On this special day, I want you to know that you are loved beyond measure. You are cherished, appreciated, and adored more than words can express, Sherry.

Forever yours,
Your Love ❤️`;

export const LoveLetterSection = ({ letter = defaultLetter }: LoveLetterSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative bg-black"
    >
      <div className="max-w-3xl w-full">
        <div
          className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute top-4 left-4 text-4xl">💌</div>
          <div className="absolute top-4 right-4 text-4xl">💕</div>

          <div className="mt-8 font-handwriting text-lg md:text-xl leading-relaxed text-gray-800 whitespace-pre-line">
            {letter.split("\n").map((line, index) => (
              <p
                key={index}
                className={`mb-4 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

