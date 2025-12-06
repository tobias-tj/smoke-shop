import { Navbar } from "@/components/Shared/Navbar/Navbar";
import FirstBlock from "./components/FirstBlock/FirstBlock";
import { SliderBrands } from "./components/SliderBrands";
import { Features } from "./components/Features";
import { OurFleet } from "./components/OurFleet";
import VapeToday from "./components/VapeToday/VapeToday";

export default function Home() {
    return( <div>
        <Navbar />
        <FirstBlock />
        <SliderBrands />
        <Features />
        <OurFleet />
        <VapeToday />
    </div>

    );
}