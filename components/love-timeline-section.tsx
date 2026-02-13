"use client";

import { useEffect, useState } from "react";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji: string;
}

interface LoveTimelineSectionProps {
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "The Beginning",
    title: "When We First Met",
    description: "The moment I knew you were special",
    emoji: "💫",
  },
  {
    id: 2,
    date: "Our First Date",
    title: "The Perfect Day",
    description: "Every moment with you feels magical",
    emoji: "🌹",
  },
  {
    id: 3,
    date: "First I Love You",
    title: "The Words That Changed Everything",
    description: "When I realized you're my forever",
    emoji: "💕",
  },
  {
    id: 4,
    date: "Today",
    title: "Our Beautiful Journey",
    description: "Every day with you is a blessing",
    emoji: "✨",
  },
];

export const LoveTimelineSection = ({ events = defaultEvents }: LoveTimelineSectionProps) => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
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

    const section = document.getElementById("love-timeline");
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
      events.forEach((event, index) => {
        setTimeout(() => {
          setVisibleEvents((prev) => [...prev, event.id]);
        }, index * 200);
      });
    }
  }, [isVisible, events]);

  return (
    <section
      id="love-timeline"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-red-400 mb-16 text-center">
        Our Love Story, Sherry 📖
      </h2>

      <div className="max-w-4xl w-full relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-rose-400 to-red-400 opacity-30"></div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } transition-all duration-1000 ${
                visibleEvents.includes(event.id)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-2">{event.emoji}</div>
                  <div className="text-pink-400 font-handwriting text-lg mb-1">{event.date}</div>
                  <h3 className="text-white font-premium text-xl md:text-2xl mb-2">{event.title}</h3>
                  <p className="text-gray-300 font-handwriting text-sm md:text-base">{event.description}</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-4 border-black shadow-lg z-10"></div>

              <div className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

