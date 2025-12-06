"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  categoryOurProducts,
  dataFirstBlockProducts,
  dataSecondBlockProducts,
} from "./OurFleet.data";

export function OurFleet() {

  return (
    <section className="max-w-7xl mx-auto text-center py-16 lg:py-32 px-6">
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl lg:text-6xl font-bold tracking-tight"
      >
        Our Vape Collection
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-lg mt-4 lg:mt-6 lg:text-xl text-muted-foreground mx-auto max-w-2xl"
      >
        Explore our curated selection of premium vapes, pods, and accessories —
        crafted for beginners and advanced vape enthusiasts.
      </motion.p>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-10 max-w-2xl mx-auto mt-10"
      >
        {categoryOurProducts.map(({ name, active }) => (
          <div
            key={name}
            className={cn(
              "rounded-xl py-2 px-3 text-sm lg:text-base transition-all",
              active
                ? "bg-black text-white shadow-lg"
                : "bg-slate-100 hover:bg-slate-200"
            )}
          >
            {name}
          </div>
        ))}
      </motion.div>

      {/* First Product Block */}
      <div className="mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dataFirstBlockProducts.map(({ url }) => (
            <motion.div
              key={url}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group"
            >
               <div className="relative rounded-xl overflow-hidden bg-white shadow-sm transition-all group-hover:shadow-lg group-hover:-translate-y-1 aspect-[4/3] flex items-center justify-center">
                <Image
                    src={`/images/${url}`}
                    alt="Vape"
                    fill
                    className="object-contain p-6"
                />
            </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Product Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,   // delay entre cada card
                delayChildren: 0.2,      // delay antes de empezar todo el bloque
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto"
        >
          {dataSecondBlockProducts.map(({ url }) => (
            <motion.div
              key={url}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden bg-white shadow-sm transition-all group-hover:shadow-lg group-hover:-translate-y-1 aspect-[4/3] flex items-center justify-center">
                <Image
                  src={`/images/${url}`}
                  alt="Vape"
                  fill
                  className="object-contain p-6"
                />
                </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Link href="/products">
            <Button
              className="rounded-xl px-8 py-6 text-lg mt-10 flex items-center justify-center"
              variant="outline"
            >
              <span className="flex items-center font-medium">
                Show all products
                <MoveRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
