import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNav />
      <main className="pt-16">{children}</main>
      <LandingFooter />
    </>
  );
}
