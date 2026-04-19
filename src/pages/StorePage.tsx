import { useEffect, useMemo, useState } from"react";
import { officialLinks } from"../data/club";
import { PageTitle } from"../components/PageTitle";
import { ProductTile } from"../components/ProductTile";
import { products } from"../data/store";

const CART_STORAGE_KEY ="amazonas-fc-store-cart";
const productsById = new Map(products.map((product) => [product.id, product]));

function normalizeQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.min(99, Math.trunc(quantity)));
}

function loadStoredCart() {
  if (typeof window ==="undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ??"[]");
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry) => {
        if (!entry || typeof entry.id !=="string") return null;
        if (!productsById.has(entry.id)) return null;
        return {
          id: entry.id,
          quantity: normalizeQuantity(entry.quantity),
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".",",")}`;
}

export function StorePage() {
  const [cartEntries, setCartEntries] = useState(loadStoredCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartEntries));
  }, [cartEntries]);

  const cartItems = useMemo(
    () =>
      cartEntries
        .map((entry) => {
          const product = productsById.get(entry.id);
          if (!product) return null;
          return {
            ...product,
            quantity: entry.quantity,
            lineTotal: product.price * entry.quantity,
          };
        })
        .filter(Boolean),
    [cartEntries],
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems],
  );

  const addProduct = (product) =>
    setCartEntries((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (!existing) {
        return [...items, { id: product.id, quantity: 1 }];
      }

      return items.map((item) =>
        item.id === product.id ? { ...item, quantity: normalizeQuantity(item.quantity + 1) } : item,
      );
    });

  const updateQuantity = (productId, quantity) =>
    setCartEntries((items) => {
      if (quantity <= 0) {
        return items.filter((item) => item.id !== productId);
      }

      return items.map((item) =>
        item.id === productId ? { ...item, quantity: normalizeQuantity(quantity) } : item,
      );
    });

  const removeProduct = (productId) =>
    setCartEntries((items) => items.filter((item) => item.id !== productId));

  const clearCart = () => setCartEntries([]);

  return (
    <main id="main-content">
      <PageTitle eyebrow="Loja" title="Manto e renda direta." text="Vitrine rápida com carrinho local e saída para a loja oficial." />
      <section className="section-shell grid gap-10 pb-24 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {products.map((item) => <ProductTile product={item} onAdd={addProduct} key={item.id} />)}
        </div>
        <aside className="glass h-fit p-6 lg:sticky lg:top-28">
          <p className="sr-only" aria-live="polite">
            {itemCount === 0 ?"Carrinho vazio" : `${itemCount} itens no carrinho, total ${formatPrice(total)}`}
          </p>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Carrinho</p>
          <h2 className="display mt-4 text-4xl leading-none">{itemCount} itens</h2>
          <p className="mt-3 text-sm font-semibold text-paper/54">O carrinho fica salvo neste navegador enquanto você navega.</p>
          <div className="mt-5 grid gap-3">
            {cartItems.length === 0 ? (
              <p className="text-sm font-semibold text-paper/56">Adicione produtos para simular compra.</p>
            ) : (
              cartItems.map((item) => (
                <div className="border-b border-paper/10 pb-4" key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/42">
                        {item.tag} · {formatPrice(item.price)}
                      </p>
                    </div>
                    <strong className="shrink-0 text-sm">{formatPrice(item.lineTotal)}</strong>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center overflow-hidden rounded-[8px] border border-paper/12">
                      <button
                        className="focus-ring h-10 w-10 text-lg font-black text-paper/72 transition hover:bg-paper/[0.06] hover:text-yellow"
                        type="button"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="flex h-10 min-w-10 items-center justify-center border-x border-paper/10 px-3 text-sm font-extrabold">
                        {item.quantity}
                      </span>
                      <button
                        className="focus-ring h-10 w-10 text-lg font-black text-paper/72 transition hover:bg-paper/[0.06] hover:text-yellow"
                        type="button"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="focus-ring text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/46 transition hover:text-yellow"
                      type="button"
                      onClick={() => removeProduct(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-paper/14 pt-5">
            <span className="text-xs font-extrabold uppercase text-paper/54">Produtos</span>
            <strong>{itemCount}</strong>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-paper/54">Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="mt-6 grid gap-3">
            {cartItems.length ? (
              <button
                className="focus-ring rounded-[8px] border border-paper/12 px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/66 transition hover:border-yellow hover:text-yellow"
                type="button"
                onClick={clearCart}
              >
                Limpar carrinho
              </button>
            ) : null}
            <a className="focus-ring flex justify-center rounded-[8px] bg-yellow px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-yellow-soft" href={officialLinks.loja} target="_blank" rel="noreferrer">
              Ir para loja oficial
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
