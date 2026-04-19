import { AmazonasScorerRow, ClubLogo, PlayerPortrait } from"./shared";
import { displayPlayerName, isAmazonasScorer } from"./utils";

export function TopScorersSection({ scorers, topScorersUrl }) {
  const amazonasScorers = scorers.filter(isAmazonasScorer);
  const amazonasTopGoals = amazonasScorers.reduce((highest, scorer) => Math.max(highest, scorer.goals), 0);
  const amazonasLeaders = amazonasScorers.filter((scorer) => scorer.goals === amazonasTopGoals);
  const amazonasLeader = amazonasLeaders[0];
  const topList = scorers.slice(0, 8);
  const serieCLeaderGoals = topList[0]?.goals ?? 0;

  if (!scorers.length) return null;

  return (
    <section className="mt-10 border-t border-paper/12 pt-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Estatísticas</p>
          <h3 className="display text-[clamp(34px,4vw,56px)] leading-[0.9] text-paper">Artilharia.</h3>
        </div>
        <a
          className="hidden rounded-[8px] border border-paper/14 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-paper/62 transition hover:border-yellow hover:text-yellow md:inline-flex"
          href={topScorersUrl}
          rel="noreferrer"
          target="_blank"
        >
          CBF
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(280px,0.78fr)]">
        <div className="overflow-hidden rounded-[8px] border border-paper/12 bg-paper/[0.035]">
          <div className="border-b border-paper/10 px-4 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">Artilharia Série C</p>
          </div>
          <div className="grid grid-cols-[42px_minmax(0,1fr)_56px_42px] border-b border-paper/10 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/44">
            <span>#</span>
            <span>Jogador</span>
            <span>Gols</span>
            <span>Clube</span>
          </div>
          {topList.map((scorer) => {
            const active = isAmazonasScorer(scorer);
            const isSerieCLeader = scorer.goals === serieCLeaderGoals;
            return (
              <div
                className={`grid grid-cols-[42px_minmax(0,1fr)_56px_42px] items-center border-b px-4 text-xs font-extrabold last:border-b-0 ${
                  active
                    ?"border-yellow/18 bg-yellow/75 py-3 text-black"
                    : isSerieCLeader
                      ?"border-yellow/16 bg-yellow/[0.08] py-4 text-paper"
                      :"border-paper/8 py-3 text-paper/76"
                }`}
                key={`${scorer.rank}-${scorer.player}`}
              >
                <span className={isSerieCLeader && !active ?"display text-2xl leading-none text-yellow" :""}>{scorer.rank}</span>
                <span className="flex min-w-0 items-center gap-3">
                  <PlayerPortrait scorer={scorer} className={`${isSerieCLeader ?"h-11 w-11" :"h-9 w-9"} shrink-0 rounded-[8px]`} />
                  <span className={`truncate uppercase ${isSerieCLeader && !active ?"display text-[26px] leading-none text-paper" :""}`}>
                    {displayPlayerName(scorer.player)}
                  </span>
                </span>
                <span className={`${active ?"text-black" :"text-yellow"} ${isSerieCLeader && !active ?"display text-3xl leading-none" :""}`}>
                  {scorer.goals}
                </span>
                <ClubLogo scorer={scorer} />
              </div>
            );
          })}
        </div>

        {amazonasLeader ? (
          <article className="rounded-[8px] border border-yellow/30 bg-yellow p-5 text-black shadow-[0_24px_80px_rgba(245,196,0,.12)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-black/56">Artilheiro do Amazonas</p>
                <strong className="display mt-4 block text-[clamp(40px,4vw,58px)] uppercase leading-[0.82]">
                  {displayPlayerName(amazonasLeader.player)}
                </strong>
              </div>
              <PlayerPortrait scorer={amazonasLeader} className="h-24 w-24 shrink-0 rounded-[8px] border border-black/12" />
            </div>
            <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-black/12 pt-5">
              <div className="flex items-center gap-3">
                <ClubLogo scorer={amazonasLeader} />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-black/62">{amazonasLeader.club}</span>
              </div>
              <div className="text-right">
                <p className="display text-6xl leading-none">{amazonasLeader.goals}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-black/58">
                  {amazonasLeader.goals === 1 ?"Gol" :"Gols"}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {amazonasLeaders.map((scorer) => (
                <AmazonasScorerRow key={`${scorer.rank}-${scorer.player}`} leader={scorer.player === amazonasLeader.player} scorer={scorer} />
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
