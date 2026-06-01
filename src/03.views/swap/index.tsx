import { Suspense } from "react";
import { SwapFlow } from "@/04.widgets";

const SwapView = () => {
  return (
    <section className="swap-page-background flex min-h-dvh w-full items-center justify-center px-4 py-12">
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
