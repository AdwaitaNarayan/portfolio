import Hero from "@/src/components/hero/Hero";
import Experience from "@/src/components/sections/Experience";
import Stacks from "@/src/components/sections/Stacks";
import Projects from "@/src/components/sections/Projects";
import Contact from "@/src/components/sections/Contact";
import ThreeColumnLayout from "../src/components/layout/ThreeColumnLayout";

export default function Home() {
  return (
    <ThreeColumnLayout>
      <Hero />
      <Experience />
      <Stacks />
      <Projects />
      <Contact />
    </ThreeColumnLayout>
  );
}
