"use client";

import { useEffect, useState, useRef } from "react";
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
    src: "/memories/memory1.jpg",
    alt: "Our first memory",
    caption: "The day we met",
  },
  {
    id: 2,
    src: "/memories/memory2.jpg",
    alt: "A special moment",
    caption: "Our first date",
  },
  {
    id: 3,
    src: "/memories/memory3.jpg",
    alt: "Beautiful memories",
    caption: "Together forever",
  },
];

const STORAGE_KEY = "valentine-memories";

const loadMemoriesFromStorage = (): Memory[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading memories from storage:", error);
  }
  return [];
};

const saveMemoriesToStorage = (memories: Memory[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch (error) {
    console.error("Error saving memories to storage:", error);
  }
};

export const MemoryGallery = ({ memories: initialMemories = defaultMemories }: MemoryGalleryProps) => {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedMemories = loadMemoriesFromStorage();
    if (storedMemories.length > 0) {
      setMemories(storedMemories);
    }
    setIsHydrated(true);
  }, []);

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

  useEffect(() => {
    if (isVisible && memories.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memories.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, memories.length]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

    imageFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newMemory: Memory = {
          id: Date.now() + Math.random() + index,
          src: imageUrl,
          alt: `Memory ${Date.now() + index}`,
          caption: file.name.replace(/\.[^/.]+$/, ""),
        };

        setMemories((prev) => {
          const updated = [...prev, newMemory];
          saveMemoriesToStorage(updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories((prev) => {
      const updated = prev.filter((memory) => memory.id !== id);
      saveMemoriesToStorage(updated);
      return updated;
    });
    if (currentIndex >= memories.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                {memories[currentIndex]?.src ? (
                  <div className="relative w-full h-full">
                    {memories[currentIndex].src.startsWith("data:") ? (
                      <img
                        src={memories[currentIndex].src}
                        alt={memories[currentIndex].alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={memories[currentIndex].src}
                        alt={memories[currentIndex].alt}
                        fill
                        className="object-cover"
                        onError={() => {
                          setMemories((prev) => prev.filter((m) => m.id !== memories[currentIndex].id));
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-sm font-semibold">Click to add more photos</p>
                      </div>
                    </div>
                    {memories.length > 0 && (
                      <button
                        onClick={(e) => handleRemoveImage(memories[currentIndex].id, e)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 z-10"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-rose-600 font-handwriting text-xl">
                        Click to add photos
                      </p>
                      <p className="text-gray-500 mt-2 text-sm">
                        Upload your beautiful memories
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

