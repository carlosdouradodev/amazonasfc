import { motion } from "framer-motion";
import { honors } from "../data/club.js";

function TrophyIcon({ variant = 0 }) {
  const stem = variant % 2 === 0 ? "M21 52h22v8H21z" : "M23 52h18v8H23z";

  return (
    <svg className="h-16 w-16" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M20 10h24v11c0 10-5 17-12 17S20 31 20 21V10z" fill="currentColor" />
      <path d="M15 15H8v5c0 8 5 14 12 15v-6c-4-1-7-5-7-10v-1h7v-3z" fill="currentColor" opacity="0.72" />
      <path d="M49 15h7v5c0 8-5 14-12 15v-6c4-1 7-5 7-10v-1h-7v-3z" fill="currentColor" opacity="0.72" />
      <path d="M29 38h6v14h-6z" fill="currentColor" />
      <path d={stem} fill="currentColor" />
      <circle cx="32" cy="10" r="3" fill="currentColor" opacity={variant === 1 ? "0.45" : "1"} />
    </svg>
  );
}

export function HonorsShowcase() {
  return (
    <section className="bg-yellow py-16 text-black md:py-20" data-honors-showcase>
      <div className="section-shell">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-black/56">Títulos</p>
          <h2 className="display text-[clamp(46px,6vw,76px)] leading-none text-black">
            3 títulos ★ 1 brasileiro
          </h2>
        </div>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {honors.map((item, index) => (
            <motion.article
              className="group relative min-h-[318px] min-w-[286px] flex-1 overflow-hidden border border-black/14 bg-yellow text-black transition duration-500 hover:border-black/35 hover:text-paper focus-within:border-black/35 focus-within:text-paper lg:min-w-0"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              key={item.id}
            >
              <img
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
                src={item.image}
                alt=""
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.12)_0%,rgba(5,4,3,.82)_100%)] opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

              <div className="relative z-10 grid min-h-[318px] grid-rows-[132px_1fr]">
                <div className="flex items-start justify-between border-b border-black/12 p-6 transition duration-500 group-hover:border-paper/22 group-focus-within:border-paper/22">
                  <TrophyIcon variant={index} />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-black/50 transition duration-500 group-hover:text-paper/62 group-focus-within:text-paper/62">
                    {item.tone}
                  </span>
                </div>

                <div className="flex flex-col justify-end p-6">
                  <span className="display text-[clamp(70px,8vw,104px)] leading-none">{item.count}</span>
                  <h3 className="display mt-4 text-[clamp(30px,3vw,42px)] leading-[0.9]">{item.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black/58 transition duration-500 group-hover:text-paper/68 group-focus-within:text-paper/68">
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
