import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Experience } from "@/app/components/Experience";
import { Certifications } from "@/app/components/Certifications";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Certifications />
      </main>
      <Contact />
      <Footer />
    </>
  );
}