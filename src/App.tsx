import { useState } from "react";
import RegionSelect from "./components/RegionSelect";
import RegionCard from "./components/RegionCard";

function App() {
  const [currentRegion, setCurrentRegion] = useState('')

  return (
    <main className="h-[100dvh] w-[100dvw]">

      <nav className="border-b p-4">
        <div className="container font-bold border-white">timezones</div>
      </nav>

      <div className="flex flex-col items-center gap-5 p-4 pt-14">
        <RegionSelect currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
        <RegionCard currentRegion={currentRegion} />
      </div>
    </main>
  );
}

export default App;
