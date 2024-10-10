import { useCallback, useMemo } from "react";

import { History } from "./types";
import { MeasureEndingScreen } from "../../../components";
import { SubmitValues } from "../types";

export const ReverseDigitSpanResults = ({
  history,
  handleSubmit,
  handleCancel,
}: {
  history: History[];
  handleSubmit: (data: SubmitValues) => void;
  handleCancel: () => void;
}) => {
  const maxLength = useMemo(() => {
    const filteredHistory = history.filter((item) => item.success);
    return filteredHistory.length > 0 ? Math.max(...filteredHistory.map((item) => item.length)) : 0;
  }, [history]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit([{ key: "span", value: maxLength, displayLabel: "Span", displayValue: maxLength.toString() }]);
  }, [handleSubmit, maxLength]);

  return (
    <MeasureEndingScreen
      results={[{ name: "Span", value: maxLength }]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
