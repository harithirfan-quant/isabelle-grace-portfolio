import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Spotlight } from "@/components/sections/spotlight";
import { SkillsRadar } from "@/components/sections/skills-radar";
import { Experience } from "@/components/sections/experience";
import { Ambassador } from "@/components/sections/ambassador";
import { Timeline } from "@/components/sections/timeline";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Press } from "@/components/sections/press";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Spotlight />
      <Press />
      <SkillsRadar />
      <Experience />
      <Ambassador />
      <Timeline />
      <Education />
      <Certifications />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
