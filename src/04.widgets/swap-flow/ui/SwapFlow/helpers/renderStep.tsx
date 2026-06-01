import type {
  ISwapFlowHandlers,
  ISwapFlowValues,
  SwapStep,
} from "../../../model";
import { ConvertStep } from "../../ConvertStep";
import { DoneStep } from "../../DoneStep";
import { ProcessingStep } from "../../ProcessingStep";
import { RecipientStep } from "../../RecipientStep";
import { ReviewStep } from "../../ReviewStep";

export interface IRenderStepParams {
  step: SwapStep;
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
  onOpenSend: () => void;
  onOpenReceive: () => void;
}

/** Maps the active flow step to the matching step component. */
export const renderStep = ({
  step,
  values,
  handlers,
  onOpenSend,
  onOpenReceive,
}: IRenderStepParams): React.ReactNode => {
  switch (step) {
    case "convert":
      return (
        <ConvertStep
          values={values}
          handlers={handlers}
          onOpenSend={onOpenSend}
          onOpenReceive={onOpenReceive}
        />
      );
    case "recipient":
      return <RecipientStep values={values} handlers={handlers} />;
    case "review":
      return <ReviewStep values={values} handlers={handlers} />;
    case "processing":
      return <ProcessingStep values={values} />;
    case "done":
      return <DoneStep values={values} handlers={handlers} />;
    default:
      return null;
  }
};
