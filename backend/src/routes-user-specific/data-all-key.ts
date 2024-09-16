import { Run } from "../db/entities/entities";
import { TASKS } from "../shared-automatic";
import { Result, wrapResult, errorResult } from "../shared-automatic/result";
import { dbRunToRun, RunView } from "./data-run-to-record";
import { schemaRuns } from "../shared-automatic";

const isNotNull = <T>(value: T | null): value is T => value !== null;

export async function fetchRunsForKey(userId: string, key: string): Promise<Result<RunView[]>> {
  try {
    const taskProto = TASKS.find((task) => task.key === key);
    if (!taskProto) return errorResult("Task not found");

    const allRuns = await Run.createQueryBuilder("run")
      .where("run.user.id = :userId", { userId })
      .innerJoinAndSelect("run.measures", "measures")
      .andWhere("run.key = :key", { key })
      .orderBy("run.created_at", "ASC")
      .getMany();

    const formattedRuns = allRuns.map(dbRunToRun).filter(isNotNull);

    const runs = schemaRuns.parse(formattedRuns);

    return wrapResult(runs.map((r) => ({ ...r, id: r.id || "" })));
  } catch (error) {
    return errorResult(`Error fetching runs: ${JSON.stringify(error)}`);
  }
}
