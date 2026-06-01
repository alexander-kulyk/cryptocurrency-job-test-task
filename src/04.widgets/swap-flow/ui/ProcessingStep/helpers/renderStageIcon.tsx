import { Check } from "lucide-react";
import { Spinner } from "@/07.shared/ui";
import type { IProcessingStage } from "../../../model";

export interface IRenderStageIconParams {
  stage: IProcessingStage;
  /** Accessible label for the in-progress spinner. */
  spinnerLabel: string;
}

/** Status badge for one processing stage: done / active / pending. */
export const renderStageIcon = ({
  stage,
  spinnerLabel,
}: IRenderStageIconParams): React.ReactNode => {
  if (stage.status === "done") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-swap-accent text-swap-accent-foreground">
        <Check className="size-3.5" />
      </span>
    );
  }
  if (stage.status === "active") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full border border-swap-accent/40 text-swap-accent">
        <Spinner label={spinnerLabel} className="size-3.5" />
      </span>
    );
  }
  return <span className="size-6 rounded-full border border-swap-border" />;
};
