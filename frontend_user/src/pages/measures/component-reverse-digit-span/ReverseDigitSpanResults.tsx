import { useCallback, useMemo } from "react";

import { History } from "./types";
import { MeasureEndingScreen } from "../../../components";

export const ReverseDigitSpanResults = ({
  history,
  handleSubmit,
  handleCancel,
}: {
  history: History[];
  handleSubmit: (data: Record<string, number>) => void;
  handleCancel: () => void;
}) => {
  const maxLength = useMemo(() => {
    const filteredHistory = history.filter((item) => item.success);
    return filteredHistory.length > 0 ? Math.max(...filteredHistory.map((item) => item.length)) : 0;
  }, [history]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit({
      span: maxLength,
    });
  }, [handleSubmit, maxLength]);

  return (
    <MeasureEndingScreen
      results={[{ name: "Span", value: maxLength }]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
