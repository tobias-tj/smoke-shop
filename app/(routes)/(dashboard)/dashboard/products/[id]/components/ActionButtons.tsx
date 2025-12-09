"use client";

export default function ActionButtons() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-80 transition">
        Buy Now
      </button>

      <button className="w-full border border-black py-3 rounded-lg font-medium hover:bg-gray-100 transition">
        Add to Favorites
      </button>
    </div>
  );
}
