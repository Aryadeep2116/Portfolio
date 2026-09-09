import { useEffect } from "react";
import { setPageMeta } from "@/lib/seo";
import { Hero } from "@/sections/Hero";
import { TrustStrip } from "@/sections/TrustStrip";
import { FeaturedProject } from "@/sections/FeaturedProject";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Capabilities } from "@/sections/Capabilities";
import { AdditionalWork } from "@/sections/AdditionalWork";
import { WhyMe } from "@/sections/WhyMe";
import { About } from "@/sections/About";
import { Availability } from "@/sections/Availability";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";

export default function Home() {
  useEffect(() => {
    setPageMeta({
      title: "Alex Morgan — Frontend Developer · React · JavaScript · AI Integrations",
      description:
        "Freelance frontend developer building fast, polished React websites, landing pages and AI-powered web features for startups and businesses. Remote, worldwide.",
      path: "/",
    });
  }, []);

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProject />
      <Services />
      <Process />
      <Capabilities />
      <AdditionalWork />
      <WhyMe />
      <About />
      <Availability />
      <FAQ />
      <FinalCTA />
      <Contact />
    </>
  );
}
