"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Memory {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

interface MemoryGalleryProps {
  memories?: Memory[];
}

const defaultMemories: Memory[] = [
  {
    id: 1,
    src: "/WhatsApp%20Image%202026-02-13%20at%2014.34.18.jpeg",
    alt: "Our beautiful memory",
    caption: "A special moment with Sherry",
  },
];

export const MemoryGallery = ({ memories: initialMemories = defaultMemories }: MemoryGalleryProps) => {
  const [memories] = useState<Memory[]>(initialMemories);
  const [currentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("memory-gallery");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);


  return (
    <section
      id="memory-gallery"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-handwriting text-rose-600 mb-12 text-center">
        Our Beautiful Memories 💕
      </h2>

      <div className="max-w-4xl w-full">
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                {memories[currentIndex]?.src ? (
                  <Image
                    src={memories[currentIndex].src}
                    alt={memories[currentIndex].alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-rose-600 font-handwriting text-xl">
                        {memories[currentIndex]?.caption || "Our Memories"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-heart-beat">💖</div>
            <div className="absolute -bottom-4 -left-4 text-4xl animate-heart-beat" style={{ animationDelay: "0.5s" }}>
              💗
            </div>
          </div>

          {memories.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-rose-500"
                      : "w-2 bg-pink-300"
                  }`}
                  aria-label={`Go to memory ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

