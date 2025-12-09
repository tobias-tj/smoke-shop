import RelatedCard from "./RelatedCard";

export default function RelatedSection({ related }: { related: any[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      {related.length === 0 ? (
        <p className="text-gray-500 text-sm">No related products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <RelatedCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
