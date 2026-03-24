import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContainerScroll from './components/ContainerScroll';
import OrbitSection from './components/OrbitSection';
import BentoSection from './components/BentoSection';
import MarqueeSection from './components/MarqueeSection';
import FeatureCards from './components/FeatureCards';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import { useLenis } from './lib/useLenis';

export default function LandingPage() {
  useLenis();
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <ContainerScroll />
        <SectionDivider dim />
        <OrbitSection />
        <SectionDivider />
        <BentoSection />
        <SectionDivider dim />
        <MarqueeSection />
        <SectionDivider />
        <FeatureCards />
        <SectionDivider dim />
        <HowItWorks />
        <SectionDivider />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
