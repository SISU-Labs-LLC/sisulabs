import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ventures from "@/components/Ventures";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Nav />
      <main className="relative flex-1">
        <Hero />
        <Ventures />
        <About />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
