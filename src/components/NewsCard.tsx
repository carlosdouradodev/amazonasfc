import { motion } from"framer-motion";

export function NewsCard({ item, large = false }) {
  const href = item.path ?? item.href;
  const external = !item.path;

  return (
    <motion.article
      className={large ?"group lg:col-span-7" :"group"}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-80px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="focus-ring block h-full" href={href} target={external ?"_blank" : undefined} rel={external ?"noreferrer" : undefined}>
        <div className={`relative h-full overflow-hidden border border-paper/12 bg-ink/70 ${large ?"min-h-[430px]" :""}`}>
          <img
            className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
              large ?"h-full min-h-[430px]" :"aspect-[1.48]"
            }`}
            src={item.image}
            alt={item.title}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.1)_0%,rgba(5,4,3,.12)_36%,rgba(5,4,3,.96)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-yellow">
              <span>{item.category}</span>
              <span className="h-px w-7 bg-yellow/60" />
              <span>{item.date}</span>
            </div>
            <h3 className={`display max-w-3xl leading-[0.95] transition group-hover:text-yellow ${large ?"text-[clamp(40px,5.4vw,68px)]" :"text-[clamp(30px,3.6vw,44px)]"}`}>
              {item.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-paper/64">{item.excerpt}</p>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
