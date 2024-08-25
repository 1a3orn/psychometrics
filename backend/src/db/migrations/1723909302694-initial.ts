import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1723909302694 implements MigrationInterface {
    name = 'Initial1723909302694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "userId" uuid, CONSTRAINT "PK_f97edf7f99f6880b40a4e25d2b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "adminId" uuid, CONSTRAINT "PK_72e0d378c5b39edb116ccf71506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "measures" text NOT NULL, "task_version" double precision NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "run" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "metadata" jsonb, "taskId" uuid, "userId" uuid, CONSTRAINT "PK_804c38ffba92002c6d2c646dd46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "number" double precision NOT NULL, "runId" uuid, "userId" uuid, CONSTRAINT "PK_ddc1ad2a86717cedc808809423e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_login_strategy" ADD CONSTRAINT "FK_895cd012ee36ee21b05441f19c7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin_login_strategy" ADD CONSTRAINT "FK_92f9d2e7c43e0414b05c86d49dc" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_35ea0b5388c33aec59bb7d97159" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_efa44ed38c52b80d4a3e5126731" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_396dcca5bac39ccba7a97b823f0" FOREIGN KEY ("runId") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_701ebd2adb1cdba524b23d22a9d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_701ebd2adb1cdba524b23d22a9d"`);
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_396dcca5bac39ccba7a97b823f0"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_efa44ed38c52b80d4a3e5126731"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_35ea0b5388c33aec59bb7d97159"`);
        await queryRunner.query(`ALTER TABLE "admin_login_strategy" DROP CONSTRAINT "FK_92f9d2e7c43e0414b05c86d49dc"`);
        await queryRunner.query(`ALTER TABLE "user_login_strategy" DROP CONSTRAINT "FK_895cd012ee36ee21b05441f19c7"`);
        await queryRunner.query(`DROP TABLE "measure"`);
        await queryRunner.query(`DROP TABLE "run"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "admin_login_strategy"`);
        await queryRunner.query(`DROP TABLE "user_login_strategy"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
