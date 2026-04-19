import { MotionSection } from"./MotionSection";
import { assets } from"../data/club";
import { news } from"../data/news";

function AccentTitle({ children }) {
  return (
    <h2 className="flex items-center gap-3 text-3xl font-bold uppercase leading-[0.95] text-paper md:text-[56px]">
      <span className="h-10 w-1.5 rounded-full bg-yellow" />
      <span>{children}</span>
    </h2>
  );
}

function Watermark({ compact = false }) {
  return (
    <div
      className={`absolute left-1/2 top-[42%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow/22 shadow-[0_0_60px_rgba(242,195,25,.12)] backdrop-blur-md ${
        compact ?"h-[72px] w-[72px]" :"h-24 w-24"
      }`}
    >
      <img className={compact ?"h-10 w-10 object-contain opacity-78" :"h-14 w-14 object-contain opacity-82"} src={assets.logo} alt="" />
    </div>
  );
}

function NewsOverlayCard({ item, featured = false }) {
  const href = item.path ?? item.href;
  const external = !item.path;

  return (
    <a
      className={`focus-ring group relative block overflow-hidden rounded-[8px] border border-paper/10 bg-[#1b1b1b] ${
        featured ?"h-[500px]" :"h-[240px]"
      }`}
      href={href}
      target={external ?"_blank" : undefined}
      rel={external ?"noreferrer" : undefined}
    >
      <img className="absolute inset-0 h-full w-full object-cover opacity-42 transition duration-500 group-hover:scale-105 group-hover:opacity-52" src={item.image} alt={item.title} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,32,32,.65)_0%,rgba(17,17,17,.35)_38%,rgba(0,0,0,.96)_100%)]" />
      <Watermark compact={!featured} />

      <div className={`absolute inset-x-0 bottom-0 z-20 ${featured ?"p-8" :"p-6"}`}>
        <span className="inline-flex rounded-full bg-yellow px-3 py-1 text-[11px] font-black uppercase text-black">{item.category}</span>
        <h3 className={`mt-4 max-w-[16ch] font-bold uppercase leading-[0.95] text-paper transition group-hover:text-yellow ${featured ?"text-[clamp(26px,2.2vw,42px)]" :"text-[clamp(18px,1.5vw,30px)]"}`}>
          {item.title}
        </h3>
        <p className={`mt-4 max-w-[46ch] text-paper/82 ${featured ?"text-sm leading-6" :"text-sm leading-6"}`}>{item.excerpt}</p>
        <span className="mt-5 inline-block text-sm font-semibold text-yellow">Ler mais →</span>
      </div>
    </a>
  );
}

export function HomeReferenceNewsSection() {
  const featured = news[0];
  const sideItems = news.slice(1, 3);

  return (
    <MotionSection className="section-shell py-20 lg:py-24">
      <div className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <AccentTitle>Manchete primeiro, ruído depois.</AccentTitle>
            <p className="ml-[18px] mt-4 text-lg text-paper/56">As últimas informações do Amazonas, além do nosso time.</p>
          </div>
          <a
            className="focus-ring inline-flex h-11 w-fit items-center justify-center rounded-[8px] bg-yellow px-6 text-sm font-black uppercase text-black transition hover:bg-yellow-soft"
            href="/noticias"
          >
            Todas as notícias
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <NewsOverlayCard item={featured} featured />

        <div className="flex flex-col gap-6">
          {sideItems.map((item) => (
            <NewsOverlayCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
