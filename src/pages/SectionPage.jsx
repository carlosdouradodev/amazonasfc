import { CTAButton } from "../components/CTAButton.jsx";
import { MotionSection } from "../components/MotionSection.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { sectionPages } from "../data/siteSections.js";

function InfoCard({ item }) {
  return (
    <article className="rounded-[8px] border border-paper/10 bg-paper/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-yellow/30 hover:bg-paper/[0.05]">
      {item.kicker ? <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">{item.kicker}</p> : null}
      <h3 className="display mt-4 text-[clamp(24px,3vw,38px)] leading-[0.92] text-paper">{item.title}</h3>
      {item.text ? <p className="mt-4 text-sm font-semibold leading-7 text-paper/66">{item.text}</p> : null}
    </article>
  );
}

function StatsGrid({ items }) {
  if (!items?.length) return null;

  return (
    <MotionSection className="section-shell grid gap-3 pb-10 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          className="rounded-[8px] border border-paper/12 bg-[linear-gradient(180deg,rgba(246,240,223,0.05),rgba(246,240,223,0.02)),rgba(5,4,3,0.76)] px-5 py-5"
          key={`${item.label}-${item.value}`}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow">{item.label}</p>
          <p className="display mt-3 text-[clamp(28px,3vw,46px)] leading-none text-paper">{item.value}</p>
        </article>
      ))}
    </MotionSection>
  );
}

export function SectionPage({ route }) {
  const page = sectionPages[route];

  if (!page) {
    return null;
  }

  const imageClassName =
    page.imageFit === "contain"
      ? "h-full w-full object-contain"
      : `h-full w-full object-cover ${page.imagePosition ?? "object-center"}`;

  return (
    <main>
      <PageTitle eyebrow={page.eyebrow} title={page.title} text={page.text} />

      <MotionSection className="section-shell grid gap-8 pb-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div
          className={`overflow-hidden rounded-[8px] border border-paper/10 ${
            page.imagePanelClassName ?? "bg-[linear-gradient(180deg,rgba(246,240,223,0.05),rgba(246,240,223,0.02)),rgba(5,4,3,0.82)]"
          }`}
        >
          <div className="aspect-[1.02] w-full">
            <img className={imageClassName} src={page.image} alt="" />
          </div>
        </div>

        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">{page.eyebrow}</p>
          <h2 className="display mt-5 max-w-[12ch] text-[clamp(38px,5vw,64px)] leading-[0.9] text-paper">{page.introTitle}</h2>
          <div className="mt-6 grid gap-5">
            {page.intro.map((paragraph) => (
              <p className="max-w-[68ch] text-base font-semibold leading-8 text-paper/70" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {page.ctas?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.ctas.map((item) => (
                <CTAButton href={item.href} external={item.external} variant={item.variant ?? "primary"} key={`${item.label}-${item.href}`}>
                  {item.label}
                </CTAButton>
              ))}
            </div>
          ) : null}
        </div>
      </MotionSection>

      <StatsGrid items={page.stats} />

      {page.blocks?.map((block) => (
        <MotionSection className="section-shell border-t border-paper/12 py-14 lg:py-18" key={block.title}>
          <div className="mb-7">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">{page.eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(34px,4vw,52px)] leading-[0.92] text-paper">{block.title}</h2>
          </div>
          <div className={`grid gap-4 ${block.columns ?? "md:grid-cols-2 xl:grid-cols-3"}`}>
            {block.items.map((item) => (
              <InfoCard item={item} key={`${block.title}-${item.title}`} />
            ))}
          </div>
        </MotionSection>
      ))}
    </main>
  );
}
