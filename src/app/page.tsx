import { Nav } from "@/components/Nav";
import { StatusBar } from "@/components/StatusBar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Comparison } from "@/components/Comparison";
import { Manifesto } from "@/components/Manifesto";
import { HowItWorks } from "@/components/HowItWorks";
import { Payers } from "@/components/Payers";
import { OriginStory } from "@/components/OriginStory";
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
        <Comparison />
        <Manifesto />
        <HowItWorks />
        <Payers />
        <OriginStory />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
