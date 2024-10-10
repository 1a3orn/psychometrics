import { FullScreen } from "../../../components";

import { MeasureComponent } from "../types";
import { MeasureResultsWrapper } from "../shared";
import { useReactionTime } from "./use-reaction-time";
import { SubmitValues } from "../types";

export const ReactionTime: MeasureComponent = (props) => (
  <MeasureResultsWrapper Component={ReactionTimeInner} {...props} />
);

const ReactionTimeInner = ({
  handleSubmit,
}: {
  handleSubmit: (sv: SubmitValues) => void;
}) => {
  const { state, handleClick } = useReactionTime({ handleSubmit });

  if (state.stage === "waiting") {
    return (
      <FullScreen>
        <ColoredClickableFS color="green" text="Wait for it...." />
      </FullScreen>
    );
  } else if (state.stage === "click") {
    return (
      <FullScreen>
        <ColoredClickableFS color="red" text="Click!" onClick={handleClick} />
      </FullScreen>
    );
  }

  return null;
};

const ColoredClickableFS = (props: {
  color: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`flex items-center justify-center text-white text-4xl font-bold w-full h-full`}
      style={{ backgroundColor: props.color }}
      onMouseDown={props.onClick}
    >
      {props.text}
    </div>
  );
};
