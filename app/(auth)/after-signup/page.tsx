"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import loadingAnimation from "@/public/loadingFunny.json";
import Lottie from "lottie-react";
import { useAuth } from "@clerk/nextjs";

const tips = [
  "Discover new flavors every week 🍓",
  "Keep your vape clean for the best experience 💨",
  "Check out our best-selling kits 🔥",
  "Enjoy your vape in minimalist style 😎",
];

export default function AfterSignUp() {
  const router = useRouter();
  const { userId } = useAuth();

  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  // Sincronizar usuario con tu DB
  useEffect(() => {
    if (!userId) return;

    const syncUser = async () => {
      const res = await fetch("/api/sync-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data?.role) setRole(data.role);
    };

    syncUser();
  }, [userId]);

  // Redirección
  useEffect(() => {
    if (!role) return;

    const timer = setTimeout(() => {
      router.push(role === "ADMIN" ? "/dashboard/admin/products-manager" : "/dashboard");
    }, 4000);

    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(tipTimer);
    };
  }, [role, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold animate-fadeIn">
          Welcome to Smoke Shop!
        </h1>

        <div className="w-40 h-40 mx-auto">
          <Lottie animationData={loadingAnimation} loop />
        </div>

        <p className="text-gray-400 text-sm italic animate-fadeIn delay-200">
          {tips[tipIndex]}
        </p>

        <div className="h-1 w-20 bg-gray-700 mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
