import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Experience } from "@/app/components/Experience";
import { Certifications } from "@/app/components/Certifications";
import { Projects } from "@/app/components/Projects";
import { GitHubStats } from "@/app/components/GitHubStats";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <Projects />
        <GitHubStats />
      </main>
      <Contact />
      <Footer />
    </>
  );
}
