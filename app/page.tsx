import Hero from "@/src/components/hero/Hero";
import About from "@/src/components/about/About";
import TechStack from "@/src/components/tech/TechStack";
import Projects from "@/src/components/projects/Projects";
import Experience from "@/src/components/experience/Experience";
import Contact from "@/src/components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
