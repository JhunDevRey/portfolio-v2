import { Nav } from "@/app/components/Nav";
import { Intro } from "@/app/components/Intro";
import { Experience } from "@/app/components/Experience";
import { Projects } from "@/app/components/Projects";
import { Background } from "@/app/components/Background";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <div id="top" className="mx-auto w-full max-w-2xl px-5 sm:px-6">
      <Nav />
      <main id="main" className="flex-1">
        <Intro />
        <Experience />
        <Projects />
        <Background />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
