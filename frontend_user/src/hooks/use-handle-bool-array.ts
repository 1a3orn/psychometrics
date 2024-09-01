import { useCallback, useState } from "react";

export const useHandleBoolArray = (length: number, init = false) => {
  const [arr, setBoolArray] = useState<boolean[]>(Array(length).fill(init));

  const setTrue = useCallback(
    (index: number) => {
      setBoolArray((prev) => {
        const newArray = [...prev];
        newArray[index] = true;
        return newArray;
      });
    },
    [setBoolArray]
  );

  const setFalse = useCallback(
    (index: number) => {
      setBoolArray((prev) => {
        const newArray = [...prev];
        newArray[index] = false;
        return newArray;
      });
    },
    [setBoolArray]
  );

  return { arr, setTrue, setFalse };
};
