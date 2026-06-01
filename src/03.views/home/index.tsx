import { ArrowRight, Blocks, MoveVertical, Zap } from "lucide-react";

interface IHomeViewProps {
  locale: string;
}

const HomeView: React.FC<IHomeViewProps> = ({ locale }) => {
  const homePath = `/${locale}`;
  const swapPath = `${homePath}/swap`;
  const designPath = `${homePath}/design`;

  return (
    <main className="swap-page-background min-h-dvh w-full overflow-x-clip text-swap-foreground">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        <a href={homePath} className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-swap-accent text-lg font-black text-swap-page shadow-[0_12px_32px_rgba(27,202,127,0.35)]">
            N
          </span>
          <span className="text-xl font-bold text-swap-title">Nova</span>
        </a>

        <div className="flex items-center gap-6 text-sm font-semibold text-swap-muted">
          <a
            className="transition-colors hover:text-swap-foreground"
            href={swapPath}
          >
            Swap
          </a>
          <a
            className="transition-colors hover:text-swap-foreground"
            href={designPath}
          >
            Design
          </a>
        </div>
      </nav>

      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-[clamp(4rem,12vh,9rem)] text-center sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-swap-accent/35 bg-swap-accent/10 px-4 py-2 text-sm font-semibold text-swap-accent">
          <Zap className="size-4" aria-hidden />
          Non-custodial &middot; Best-rate guarantee
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[0.96] text-swap-title sm:text-6xl lg:text-7xl">
          Convert crypto,
          <span className="block text-swap-accent">beautifully.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-swap-muted">
          Swap 30+ assets at the best market rate in a few taps &mdash; packed
          by a tight, considered design system. Pick where you&apos;d like to go.
        </p>

        <div className="mt-14 grid w-full max-w-3xl gap-5 text-left sm:grid-cols-2">
          <a
            href={swapPath}
            className="group rounded-swap-card border border-swap-border bg-swap-surface/82 p-7 shadow-swap-card backdrop-blur transition-colors hover:border-swap-accent/60 hover:bg-swap-elevated focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-swap-accent/40"
          >
            <span className="flex size-16 items-center justify-center rounded-swap-control bg-swap-accent text-swap-page">
              <MoveVertical className="size-8" aria-hidden />
            </span>
            <h2 className="mt-7 text-2xl font-bold text-swap-foreground">
              Swap
            </h2>
            <p className="mt-3 text-base leading-7 text-swap-muted">
              Launch the live convert flow &mdash; choose a pair, enter an amount,
              and walk the full swap to confirmation.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-base font-bold text-swap-accent">
              Open the app
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </a>

          <a
            href={designPath}
            className="group rounded-swap-card border border-swap-border bg-swap-surface/82 p-7 shadow-swap-card backdrop-blur transition-colors hover:border-swap-accent/60 hover:bg-swap-elevated focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-swap-accent/40"
          >
            <span className="flex size-16 items-center justify-center rounded-swap-control border border-swap-strong-border bg-swap-elevated text-swap-accent">
              <Blocks className="size-7" aria-hidden />
            </span>
            <h2 className="mt-7 text-2xl font-bold text-swap-foreground">
              Design
            </h2>
            <p className="mt-3 text-base leading-7 text-swap-muted">
              Explore the system &mdash; color, typography, radii, elevation and
              the components every screen is built from.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-base font-bold text-swap-accent">
              View the system
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </a>
        </div>

        <dl className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-swap-border text-center">
          <div>
            <dt className="text-3xl font-bold text-swap-foreground">30+</dt>
            <dd className="mt-2 text-sm text-swap-subtle">Assets supported</dd>
          </div>
          <div>
            <dt className="text-3xl font-bold text-swap-foreground">~5 min</dt>
            <dd className="mt-2 text-sm text-swap-subtle">Average swap time</dd>
          </div>
          <div>
            <dt className="text-3xl font-bold text-swap-foreground">0</dt>
            <dd className="mt-2 text-sm text-swap-subtle">Accounts needed</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default HomeView;
