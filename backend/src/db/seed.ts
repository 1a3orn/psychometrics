import { AppDataSource } from "./db";
import { Run } from "./entities/entities";

async function seed() {
  await AppDataSource.initialize();

  const testRepository = AppDataSource.getRepository(Run);

  // Delete all tasks
  await testRepository.delete({});

  console.log("Seeding completed!");
  await AppDataSource.destroy();
}

seed().catch((error) => console.log(error));
