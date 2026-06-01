import { Suspense } from "react";
import { SwapFlow } from "@/04.widgets";
import { BackHomeLink } from "@/07.shared/ui";

interface ISwapViewProps {
  homeHref?: string;
}

const SwapView: React.FC<ISwapViewProps> = ({ homeHref = "/en" }) => {
  return (
    <section className="swap-page-background relative flex min-h-dvh w-full items-start justify-center px-4 pb-12 pt-[clamp(3rem,8vh,6rem)]">
      <BackHomeLink
        href={homeHref}
        className="fixed left-4 top-4 z-40 sm:left-6 sm:top-6"
      />
      <Suspense
        fallback={
          <div className="h-[420px] w-full max-w-[40rem] animate-pulse rounded-swap-card border border-swap-border bg-swap-surface shadow-swap-card" />
        }
      >
        <SwapFlow />
      </Suspense>
    </section>
  );
};

export default SwapView;
