import { Nav } from "@/components/Nav";
import { StatusBar } from "@/components/StatusBar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Payers } from "@/components/Payers";
import { Credibility } from "@/components/Credibility";
import { ApplyForm } from "@/components/ApplyForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <StatusBar />
      <main id="top">
        <Hero />
        <Problem />
        <HowItWorks />
        <Payers />
        <Credibility />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
