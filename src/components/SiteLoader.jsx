import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import amazonasLogoSvg from "../../amazonas-fc-logo.svg?raw";

const cleanLogoSvg = amazonasLogoSvg.replace(/<\?xml[\s\S]*?\?>/, "").trim();

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const previousOverflowRef = useRef("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const reducedTimer = window.setTimeout(() => setVisible(false), 380);
      return () => window.clearTimeout(reducedTimer);
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => setActive(true));
    const timer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflowRef.current;
      setVisible(false);
    }, 1960);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="site-loader__grain" />
          <div className={`site-loader__mark ${active ? "is-active" : ""}`}>
            <div className="site-loader__halo" />
            <div className="site-loader__orb" />
            <div className="site-loader__ring site-loader__ring--outer" />
            <div className="site-loader__ring site-loader__ring--inner" />
            <div className="site-loader__orbit">
              <span className="site-loader__orbit-dot" />
            </div>
            <div className="site-loader__fill" dangerouslySetInnerHTML={{ __html: cleanLogoSvg }} />
            <div className="site-loader__sheen" />
          </div>
          <div className={`site-loader__caption ${active ? "is-active" : ""}`}>
            <span>Amazonas FC</span>
            <span className="site-loader__caption-sub">carregando</span>
            <span className="site-loader__bar">
              <i />
              <i />
              <i />
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
