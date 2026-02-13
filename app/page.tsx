"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { LoveLetterSection } from "@/components/love-letter-section";
import { MemoryGallery } from "@/components/memory-gallery";
import { WhyILoveYouSection } from "@/components/why-i-love-you-section";
import { SurpriseSection } from "@/components/surprise-section";
import { ForeverMessageSection } from "@/components/forever-message-section";
import { LoveTimelineSection } from "@/components/love-timeline-section";
import { RomanticQuotesSection } from "@/components/romantic-quotes-section";
import { PromisesSection } from "@/components/promises-section";
import { Footer } from "@/components/footer";
import { MusicToggle } from "@/components/music-toggle";
import { useHeartAnimation, FloatingHearts } from "@/components/heart-animation";

export default function Home() {
  const { hearts, createHeart } = useHeartAnimation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createHeart(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [createHeart]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <MusicToggle musicFile="/liosound_Cinematic_main.mp3" />
      <FloatingHearts hearts={hearts} />

      <HeroSection girlfriendName="Sherry" />
      <LoveLetterSection />
      <LoveTimelineSection />
      <MemoryGallery />
      <RomanticQuotesSection />
      <WhyILoveYouSection />
      <PromisesSection />
      <SurpriseSection />
      <ForeverMessageSection />
      <Footer aivantaUrl="https://aivanta.com" />
    </main>
  );
}
