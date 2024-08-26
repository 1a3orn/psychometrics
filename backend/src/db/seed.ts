import { AppDataSource } from "./db";
import { Task } from "./entities/entities";

async function seed() {
  await AppDataSource.initialize();

  const testRepository = AppDataSource.getRepository(Task);

  const t1 = new Task();

  t1.key = "test";
  t1.name = "Reflex Test";
  t1.measures = ["test"];
  t1.taskVersion = 1;

  const t2 = new Task();
  t2.key = "reaction-time";
  t2.name = "Reaction Time";
  t2.measures = ["reaction_time"];
  t2.taskVersion = 1;

  const t3 = new Task();
  t3.key = "choosing-reaction-time";
  t3.name = "Choosing Reaction Time";
  t3.measures = ["accuracy", "reaction_time"];
  t3.taskVersion = 1;

  await testRepository.save([t1, t2, t3]);

  console.log("Seeding completed!");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log(error));
