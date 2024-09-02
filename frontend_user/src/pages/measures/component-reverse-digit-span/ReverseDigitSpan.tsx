import { MeasureComponent } from "../types";
import { useReverseDigitSpan } from "./use-reverse-digit-span";
import { ReverseDigitSpanPlay } from "./ReverseDigitSpanPlay";
import { ReverseDigitSpanResults } from "./ReverseDigitSpanResults";

export const ReverseDigitSpan: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const { isGameRunning, handleFinish, history } = useReverseDigitSpan();

  if (isGameRunning) {
    return <ReverseDigitSpanPlay handleFinish={handleFinish} priorRun={priorRun} />;
  } else {
    return <ReverseDigitSpanResults history={history} handleSubmit={handleSubmit} handleCancel={handleCancel} />;
  }
};
