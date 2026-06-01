import { classes } from "@/07.shared/lib";
import type { SwapStep } from "../../model";

const SEGMENT_COUNT = 4;

const ACTIVE_SEGMENTS: Readonly<Record<SwapStep, number>> = {
  convert: 1,
  recipient: 2,
  review: 3,
  processing: 4,
  done: 4,
};

export interface IStepProgressProps {
  step: SwapStep;
  label: string;
}

const StepProgress: React.FC<IStepProgressProps> = ({ step, label }) => {
  const active = ACTIVE_SEGMENTS[step];

  return (
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={SEGMENT_COUNT}
      aria-valuenow={active}
      aria-label={label}
    >
      {Array.from({ length: SEGMENT_COUNT }, (_, index) => {
        const isActive = index < active;
        const isLeadingActive = index === active - 1;
        return (
          <span
            key={index}
            className={classes(
              "h-1.5 rounded-full transition-all duration-300 ease-swap",
              isActive ? "bg-swap-accent" : "bg-swap-border",
              isLeadingActive ? "w-6" : "w-2.5",
            )}
          />
        );
      })}
    </div>
  );
};

export default StepProgress;
