import { useState } from "react";
import { Measure } from "../../../api";
import { useSpeechSynthesis, useEffectOnce } from "../../../hooks";

import { History } from "./types";

const generateString = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join(" ");
};

const reverseString = (x: string) => {
  let xx = "";
  for (let i = x.length - 1; i >= 0; i--) {
    xx = xx + x[i];
  }
  return xx;
};

export const ReverseDigitSpanPlay = (props: {
  priorRun?: Record<string, number>;
  handleFinish: (history: History[]) => void;
}) => {
  const [phase, setPhase] = useState<"playing" | "waiting" | "success">("playing");

  const [history, setHistory] = useState<History[]>([]);
  const { playSound, isReady } = useSpeechSynthesis();

  const [level, setLevel] = useState(1);
  const [currentString, setCurrentString] = useState("");
  const [input, setInput] = useState("");

  useEffectOnce(() => {
    setTimeout(() => {
      const newString = generateString(level);
      setCurrentString(newString);
      playSound(newString);
      setTimeout(() => {
        setPhase("waiting");
      }, 30 * newString.length);
    }, 100);
  }, [level, isReady, playSound]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reversed = reverseString(currentString);
    if (input === reversed.replaceAll(" ", "")) {
      setHistory([...history, { number: currentString, length: level, success: true }]);
      setPhase("success");
      setTimeout(() => {
        setLevel(level + 1);
        setPhase("playing");
        setInput("");
      }, 1000);
    } else {
      const newHistory = [...history, { number: currentString, length: level, success: false }];
      setHistory(newHistory);
      props.handleFinish(newHistory);
    }
  };

  if (phase === "playing") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <div className="text-center text-xl font-bold">Playing...</div>
        </div>
      </div>
    );
  } else if (phase === "waiting") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <div className="text-center text-xl font-bold">Enter the number you just heard, in reverse</div>
          <div className="flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                autoFocus
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <div className="text-center text-xl font-bold text-green-500">Success!</div>
        </div>
      </div>
    );
  }
};
