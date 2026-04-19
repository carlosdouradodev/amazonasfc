export function ProductTile({ product, onAdd }) {
  return (
    <article className="group overflow-hidden border border-paper/12 bg-ink/72 transition duration-300 hover:-translate-y-1 hover:border-yellow/70">
      <div className="overflow-hidden">
        <img
          className="aspect-[1.2] w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">{product.tag}</p>
        <h3 className="display mt-3 text-4xl leading-none">{product.name}</h3>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="font-extrabold">R$ {product.price.toFixed(2).replace(".",",")}</span>
          <button
            className="focus-ring rounded-[8px] bg-yellow px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-black transition hover:bg-yellow-soft"
            type="button"
            onClick={() => onAdd(product)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  );
}
