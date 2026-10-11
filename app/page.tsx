import { DeskShell } from "@/components/desktop/desk-shell";
import { Wall } from "@/components/desktop/wall";
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

/**
 * The homepage is a desktop scene: menubar, one window, dock. Every existing
 * section still renders inside that window in its original order, so nothing a
 * recruiter looks for has moved or been hidden behind an icon.
 *
 * The wall (awards and keepsakes) sits directly under the hero so the evidence
 * is the first thing after the intro.
 */
export default function Home() {
  return (
    <DeskShell>
      <main>
        <Hero />
        <Wall />
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
    </DeskShell>
  );
}
