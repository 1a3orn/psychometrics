import { useState, useCallback, ReactElement } from "react";
import { SubmitValues } from "../types";
import { MeasureEndingScreen } from "../../../components";

export const MeasureResultsWrapper = ({
  Component,
  currentIndex,
  totalCount,
  handleSubmit,
  handleCancel,
  lastRun,
}: {
  Component: ({
    handleSubmit,
  }: {
    handleSubmit: (sv: SubmitValues) => void;
  }) => ReactElement | null;
  currentIndex: number;
  totalCount: number;
  handleSubmit: (sv: SubmitValues) => void;
  handleCancel: () => void;
  lastRun: boolean;
}) => {
  const [showChildren, setShowChildren] = useState(true);

  const [submitValues, setSubmitValues] = useState<SubmitValues | null>(null);

  const handleSubmitInner = useCallback(
    (sv: SubmitValues) => {
      if (lastRun) {
        handleSubmit(sv);
      } else {
        setSubmitValues(sv);
        setShowChildren(false);
      }
    },
    [lastRun, handleSubmit]
  );

  const handleSubmitOuter = useCallback(() => {
    if (submitValues) {
      handleSubmit(submitValues);
    }
  }, [submitValues, handleSubmit]);

  if (showChildren) {
    return <Component handleSubmit={handleSubmitInner} />;
  } else if (submitValues) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
        <MeasureEndingScreen
          currentIndex={currentIndex}
          totalCount={totalCount}
          results={submitValues.map((sv) => ({
            name: sv.displayLabel,
            value: sv.value,
          }))}
          handleCancel={handleCancel}
          handleSubmit={handleSubmitOuter}
        />
      </div>
    );
  }
  return null;
};
