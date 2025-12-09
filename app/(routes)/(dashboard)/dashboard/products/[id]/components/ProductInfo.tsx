import ActionButtons from "./ActionButtons";

export default function ProductInfo({ product }: { product: any }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>

      {product.description && (
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      )}

      <div className="text-3xl font-bold text-black">${Number(product.price).toFixed(2)}</div>

      <ActionButtons />
    </div>
  );
}
