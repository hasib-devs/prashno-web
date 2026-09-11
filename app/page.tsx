import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";
import { HeroSection } from "@/components/sections/hero";
import { SocialProofBar } from "@/components/sections/social-proof";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { DemoShowcase } from "@/components/sections/demo-showcase";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeatureGrid />
        <DemoShowcase />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTABanner />
      </main>
      <LandingFooter />
    </>
  );
}
