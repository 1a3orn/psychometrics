import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getLastRunText = (lastRun: string | null) => {
  if (!lastRun) {
    return "Never";
  }
  const lastRunDate = dayjs(lastRun);
  const now = dayjs();
  const diffDays = now.diff(lastRunDate, "day");

  if (diffDays === 0) {
    return "Today";
  } else {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
};

const getLastRunColor = (lastRun: string | null) => {
  if (!lastRun) {
    return "text-red-500";
  }
  const diffDays = dayjs().diff(dayjs(lastRun), "day");

  if (diffDays <= 1) {
    return "text-green-500";
  } else if (diffDays <= 4) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};

export const LastRun = ({ lastRun }: { lastRun: string | null }) => {
  // ... existing code ...

  return (
    // ... existing code ...
    <div className="text-sm text-gray-500 font-semibold">
      Last run: <span className={getLastRunColor(lastRun)}>{getLastRunText(lastRun)}</span>
    </div>
  );
};
