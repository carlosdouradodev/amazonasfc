import { motion } from "framer-motion";

export function SectionHeader({ eyebrow, title, text, action }) {
  return (
    <motion.div
      className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">{eyebrow}</p>
        <h2 className="display max-w-4xl text-[clamp(42px,7vw,88px)] leading-[0.92]">{title}</h2>
        {text ? <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-paper/64 md:text-lg">{text}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </motion.div>
  );
}
