import Hero from "@/components/home/Hero";
import Areas from "@/components/home/Areas";
import UpcomingSection from "@/components/home/UpcomingSection";
import ImpactStats from "@/components/home/ImpactStats";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import CommunityVoices from "@/components/home/CommunityVoices";
import Faq from "@/components/home/Faq";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Areas />
      <UpcomingSection />
      <ImpactStats />
      <Features />
      <Gallery />
      <CommunityVoices />
      <Faq />
      <Newsletter />
    </>
  );
}
