import GoldLamp from "@/components/GoldLamp";
import CopperLamp from "@/components/CopperLamp";
import WallLamp from "@/components/WallLamp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 px-8 py-16">
      <GoldLamp />
      <CopperLamp />
      <WallLamp />
    </main>
  );
}
