import { Trial } from "./generate-trials";

const getCorrect = (pressed: boolean, isMatch: boolean) => {
  if (pressed) {
    return isMatch ? "text-green-500" : "text-red-500";
  }
  return "text-gray-500";
};

export const DualNBackPlay: React.FC<{
  nBack: number;
  currentIdx: number;
  trials: Trial[];
  curHasVisibleSquare: boolean;
  pressedPosition: boolean;
  pressedLetter: boolean;
}> = ({ nBack, currentIdx, trials, curHasVisibleSquare, pressedPosition, pressedLetter }) => (
  <div className="p-4">
    <div>
      <h2 className="text-2xl font-bold mb-4">N-Back: {nBack}</h2>
      <div className="flex flex-row justify-center">
        <div className="grid grid-cols-3 gap-4 mb-4 w-64 h-64">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => (
            <div
              key={position}
              className={`aspect-square border ${
                currentIdx >= 0 && trials[currentIdx].position === position && curHasVisibleSquare
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <p className="mb-4">Current letter: {currentIdx >= 0 ? trials[currentIdx].letter : ""}</p>
      <div className="flex items-center flex-row w-full justify-center gap-4">
        <p className={`text-sm ${getCorrect(pressedPosition, currentIdx >= 0 && trials[currentIdx].positionMatch)}`}>
          Press 'A' for position match
        </p>
        <p className={`text-sm ${getCorrect(pressedLetter, currentIdx >= 0 && trials[currentIdx].letterMatch)}`}>
          Press 'L' for letter match
        </p>
      </div>
      <p className="mb-4">
        Progress: {currentIdx + 1} / {trials.length}
      </p>
    </div>
  </div>
);
