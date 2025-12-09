"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="flex items-center gap-2 text-gray-600 hover:text-black transition font-medium mb-6"
    >
      <ArrowLeft size={18} />
      Back to products
    </button>
  );
}
