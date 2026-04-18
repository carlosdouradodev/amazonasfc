import { useMemo, useState } from "react";
import { officialLinks, products } from "../data/club.js";
import { PageTitle } from "../components/PageTitle.jsx";
import { ProductTile } from "../components/ProductTile.jsx";

export function StorePage() {
  const [cart, setCart] = useState([]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const addProduct = (product) => setCart((items) => [...items, product]);

  return (
    <main>
      <PageTitle eyebrow="Loja" title="Manto e renda direta." text="Vitrine rápida com carrinho local e saída para a loja oficial." />
      <section className="section-shell grid gap-10 pb-24 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {products.map((item) => <ProductTile product={item} onAdd={addProduct} key={item.id} />)}
        </div>
        <aside className="glass h-fit p-6 lg:sticky lg:top-28">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Carrinho</p>
          <h2 className="display mt-4 text-4xl leading-none">{cart.length} itens</h2>
          <div className="mt-5 grid gap-3">
            {cart.length === 0 ? (
              <p className="text-sm font-semibold text-paper/56">Adicione produtos para simular compra.</p>
            ) : (
              cart.map((item, index) => (
                <div className="flex items-center justify-between border-b border-paper/10 pb-3 text-sm font-bold" key={`${item.id}-${index}`}>
                  <span>{item.name}</span>
                  <span>R$ {item.price.toFixed(2).replace(".", ",")}</span>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-paper/14 pt-5">
            <span className="text-xs font-extrabold uppercase text-paper/54">Total</span>
            <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
          </div>
          <a className="focus-ring mt-6 flex justify-center rounded-[8px] bg-yellow px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-yellow-soft" href={officialLinks.loja} target="_blank" rel="noreferrer">
            Loja oficial
          </a>
        </aside>
      </section>
    </main>
  );
}
