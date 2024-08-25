import { MigrationInterface, QueryRunner } from "typeorm";

export class Next1724519247269 implements MigrationInterface {
    name = 'Next1724519247269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" RENAME COLUMN "name" TO "key"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "key" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_45cd03f9626d4bf7de9a1e69c2a" UNIQUE ("key")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_45cd03f9626d4bf7de9a1e69c2a"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "measure" RENAME COLUMN "key" TO "name"`);
    }

}
