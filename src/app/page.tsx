import Hero from "@/components/Hero";
import TickerTape from "@/components/TickerTape";
import Holodeck from "@/components/Holodeck";
import Roster from "@/components/Roster";
import Arena from "@/components/Arena";
import Chamber from "@/components/Chamber";
import Concierge from "@/components/Concierge";

export default function Home() {
  return (
    <main>
      <Hero />
      <TickerTape />
      <Holodeck />
      <Roster />
      <Arena />
      <Chamber />
      <Concierge />
    </main>
  );
}