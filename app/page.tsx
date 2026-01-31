import Hero from "@/src/components/hero/Hero";
import Experience from "@/src/components/sections/Experience";
import Projects from "@/src/components/sections/Projects";
import ThreeColumnLayout from "@/src/components/layout/ThreeColumnLayout";

export default function Home() {
  return (
    <ThreeColumnLayout>
      <Hero />
      <Experience />
      <Projects />
    </ThreeColumnLayout>
  );
}
