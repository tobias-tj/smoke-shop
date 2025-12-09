import Image from "next/image";

export default function ProductImage({ image, name }: { image: string | null; name: string }) {
  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl shadow overflow-hidden">
      <Image
        src={image ?? "/placeholder.jpg"}
        alt={name}
        fill
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
