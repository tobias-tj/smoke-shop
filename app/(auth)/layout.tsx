"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { ShieldCheck, Zap, Flame, Droplet } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen grid lg:grid-cols-2 bg-black text-white overflow-hidden">

      <div className="hidden lg:flex relative items-center justify-center px-16">

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#111] via-black to-[#222]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <motion.div
          className="absolute inset-0 bg-[url('/images/smoke.png')] bg-cover bg-center opacity-20"
          animate={{ y: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative space-y-10 max-w-xl"
        >
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={90}
              height={90}
              className="mx-auto opacity-90"
            />
            <h1 className="text-3xl font-bold mt-4 tracking-tight">
              Smoke Shop
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Premium Vape Store
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Flame,
                title: "High Quality",
                desc: "Productos originales garantizados.",
              },
              {
                icon: Droplet,
                title: "Smooth Vapor",
                desc: "La mejor experiencia de vapeo.",
              },
              {
                icon: ShieldCheck,
                title: "Seguro",
                desc: "Transacciones protegidas.",
              },
              {
                icon: Zap,
                title: "Entrega Rápida",
                desc: "Envíos a todo el país.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="border border-white/10 rounded-xl p-4 
                           backdrop-blur-md hover:bg-white/5 transition"
              >
                <item.icon className="w-7 h-7 text-gray-300 mb-2" />
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative flex items-center justify-center p-8">

        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute inset-0 bg-gradient-to-b from-[#111]/40 to-black"
        />

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
