"use client";

import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VapeToday() {
  const { scrollY } = useScroll();

  // Parallax suave
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <div className="p-6 lg:my-32 max-w-7xl mx-auto">
      <div className="relative rounded-xl overflow-hidden">

        {/* --- Animated Parallax Background --- */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[url('/images/vapebg5.png')] bg-cover bg-center scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content layer */}
        <div className="relative p-6 lg:p-32">
          <div>
            <h3 className="text-4xl text-white font-bold">
              Elevate Your Vape Experience
            </h3>

            <p className="text-white text-xl my-5 max-w-md">
              Explore premium vapes, pods, and accessories designed for bold flavor
              and smooth performance.
            </p>

            <Link href="/sign-up">
              <Button
                variant="outline"
                size="lg"
                className="text-black border-white hover:secondary transition"
              >
                Register Here
              </Button>
            </Link>
          </div>

          {/* Vape image reveal */}
          <Reveal className="lg:absolute lg:-right-32 top-5" position="bottom">
            <Image
              src="/images/firstblock.png"
              alt="Premium Vape"
              width={450}
              height={250}
              className="drop-shadow-xl"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
