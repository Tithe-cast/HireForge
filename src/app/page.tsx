import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import FeaturedJobs from "@/components/sections/FeaturedJobs";
import Categories from "@/components/sections/Categories";
import HowItWorks from "@/components/sections/HowItWorks";
import SalaryStats from "@/components/sections/SalaryStats";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQPreview from "@/components/sections/FAQPreview";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedJobs />
      <Categories />
      <HowItWorks />
      <SalaryStats />
      <Testimonials />
      <BlogPreview />
      <FAQPreview />
      <Newsletter />
      <CTASection />
    </>
  );
}
