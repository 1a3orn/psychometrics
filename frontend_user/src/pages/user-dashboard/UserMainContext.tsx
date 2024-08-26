import { createContext } from "react";

import { getLatestRuns, allTasks, LatestRuns, Task } from "../../api";
import { useAsync, AsyncState } from "../../hooks";

const request = async () => {
  const [runs, tasks] = await Promise.all([getLatestRuns(), allTasks()]);
  return { latestRuns: runs, allTasks: tasks };
};

export type UserMainContextType = AsyncState<{ latestRuns: LatestRuns[]; allTasks: Task[] }>;

export const UserMainContext = createContext<UserMainContextType>({
  data: undefined,
  type: "loading",
});

export const UserMainProvider = ({ children }: { children: React.ReactNode }) => {
  const asyncState = useAsync(request);
  return <UserMainContext.Provider value={asyncState}>{children}</UserMainContext.Provider>;
};
