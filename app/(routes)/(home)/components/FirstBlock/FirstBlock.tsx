import { Reveal } from "@/components/Shared/Reveal";
import Image from "next/image";

export default function FirstBlock() {
    return (
        <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
            Premium<span className="block">Vape & Smoke Shop</span>
            Online
        </h1>

        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
            Discover high-quality vapes, pods, and electronic devices. Enjoy
            bold flavors, authentic products, and a fast, secure shopping
            experience designed for modern smokers.
        </p>
      </Reveal>

      <Reveal className="flex justify-end" position="right">
        <Image
          src="/images/firstblock.png"
          alt="My Vapes"
          width={800}
          height={800}
          priority
        />
      </Reveal>
    </div>
    );
}