import { Suspense } from "react";
import { SwapFlow } from "@/04.widgets";

const SwapView = () => {
  return (
    <section className="flex min-h-dvh w-full items-center justify-center bg-muted px-4 py-12">
      <Suspense
        fallback={
          <div className="h-[420px] w-full max-w-md animate-pulse rounded-swap-card bg-swap-surface shadow-swap-card" />
        }
      >
        <SwapFlow />
      </Suspense>
    </section>
  );
};

export default SwapView;
