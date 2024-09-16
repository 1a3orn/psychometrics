import { Run, Measure, User } from "../db/entities/entities";
import { schemaRun, TASKS } from "../shared-automatic";
import { EntityManager } from "typeorm";

export async function processRun(
  body: ReturnType<typeof schemaRun.parse>,
  userId: string,
  transaction: EntityManager
): Promise<{ success: boolean; error?: string }> {
  // 1. Make sure task matches
  const taskProto = TASKS.find((task) => task.key === body.key);
  if (!taskProto) {
    return { success: false, error: "Task not found" };
  }

  // 2. Validate measures
  const validated = taskProto.validateObject(body.measures);
  if (!validated.success) {
    return { success: false, error: validated.error };
  }

  const run = new Run();
  run.startedAt = new Date(body.startedAt);
  run.endedAt = new Date(body.endedAt);
  run.metadata = body.metadata || {};
  run.key = taskProto.key;
  run.user = { id: userId } as unknown as User;

  await transaction.save(run);

  const measures = Object.keys(body.measures).map((key) => {
    const m = new Measure();
    m.key = key;
    m.number = body.measures[key];
    m.run = run;
    return m;
  });
  await transaction.save(measures);

  return { success: true };
}
