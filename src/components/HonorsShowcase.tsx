import { motion } from"framer-motion";
import { honors } from"../data/club";

function TrophyIcon({ variant = 0 }) {
  const stem = variant % 2 === 0 ?"M21 52h22v8H21z" :"M23 52h18v8H23z";

  return (
    <svg className="h-16 w-16" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M20 10h24v11c0 10-5 17-12 17S20 31 20 21V10z" fill="currentColor" />
      <path d="M15 15H8v5c0 8 5 14 12 15v-6c-4-1-7-5-7-10v-1h7v-3z" fill="currentColor" opacity="0.72" />
      <path d="M49 15h7v5c0 8-5 14-12 15v-6c4-1 7-5 7-10v-1h-7v-3z" fill="currentColor" opacity="0.72" />
      <path d="M29 38h6v14h-6z" fill="currentColor" />
      <path d={stem} fill="currentColor" />
      <circle cx="32" cy="10" r="3" fill="currentColor" opacity={variant === 1 ?"0.45" :"1"} />
    </svg>
  );
}

export function HonorsShowcase() {
  return (
    <section className="bg-yellow pb-16 pt-28 text-black md:py-20" data-honors-showcase>
      <div className="section-shell">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-black/56">Títulos</p>
          <h2 className="display max-w-[12ch] text-[clamp(38px,12vw,76px)] leading-[0.88] text-black md:max-w-none md:leading-none">
            3 títulos ★ 1 brasileiro
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:flex md:overflow-x-auto md:pb-2 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
          {honors.map((item, index) => (
            <motion.article
              className="group relative min-h-[316px] w-full overflow-hidden border border-black/14 bg-yellow text-paper transition duration-500 md:min-h-[318px] md:min-w-[286px] md:flex-1 md:text-black md:hover:border-black/35 md:hover:text-paper md:focus-within:border-black/35 md:focus-within:text-paper lg:min-w-0"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin:"-70px" }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              key={item.id}
            >
              <img
                className="absolute inset-0 h-full w-full scale-100 object-cover opacity-100 transition duration-700 md:scale-105 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100 md:group-focus-within:scale-100 md:group-focus-within:opacity-100"
                src={item.image}
                alt={`${item.title} ${item.subtitle}`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.24)_0%,rgba(5,4,3,.86)_100%)] opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />

              <div className="relative z-10 grid min-h-[316px] grid-rows-[120px_1fr] md:min-h-[318px] md:grid-rows-[132px_1fr]">
                <div className="flex items-start justify-between border-b border-paper/20 p-6 transition duration-500 md:border-black/12 md:group-hover:border-paper/22 md:group-focus-within:border-paper/22">
                  <TrophyIcon variant={index} />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-paper/62 transition duration-500 md:text-black/50 md:group-hover:text-paper/62 md:group-focus-within:text-paper/62">
                    {item.tone}
                  </span>
                </div>

                <div className="flex flex-col justify-end p-6">
                  <span className="display text-[clamp(58px,18vw,88px)] leading-none md:text-[clamp(70px,8vw,104px)]">{item.count}</span>
                  <h3 className="display mt-4 max-w-full text-[clamp(31px,9vw,44px)] leading-[0.88] md:text-[clamp(30px,3vw,42px)] md:leading-[0.9]">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/68 transition duration-500 md:text-black/58 md:group-hover:text-paper/68 md:group-focus-within:text-paper/68">
                    <span>{item.subtitle}</span>
                    <span className="h-px w-8 bg-current opacity-50" />
                    <span>{item.years}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
