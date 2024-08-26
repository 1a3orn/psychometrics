import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724688617289 implements MigrationInterface {
    name = 'Initial1724688617289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "user_id" uuid, CONSTRAINT "PK_f97edf7f99f6880b40a4e25d2b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "admin_id" uuid, CONSTRAINT "PK_72e0d378c5b39edb116ccf71506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "name" character varying NOT NULL, "measures" text NOT NULL, "task_version" integer NOT NULL, CONSTRAINT "UQ_45cd03f9626d4bf7de9a1e69c2a" UNIQUE ("key"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "run" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "metadata" jsonb, "task_id" uuid, "user_id" uuid, CONSTRAINT "PK_804c38ffba92002c6d2c646dd46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "number" integer NOT NULL, "run_id" uuid, "user_id" uuid, CONSTRAINT "PK_ddc1ad2a86717cedc808809423e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_login_strategy" ADD CONSTRAINT "FK_50f42109a0126ad8d00375ed8e6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin_login_strategy" ADD CONSTRAINT "FK_99a1b4e0833e712d7ab7a35e9e5" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_ede5121ab7d04a258909bc13dc2" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_5f8a163e576ca7272e869ac9713" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_0f34661b3addbe53ea32219d8f3" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_f309de390255431fff518232882" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_f309de390255431fff518232882"`);
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_0f34661b3addbe53ea32219d8f3"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_5f8a163e576ca7272e869ac9713"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_ede5121ab7d04a258909bc13dc2"`);
        await queryRunner.query(`ALTER TABLE "admin_login_strategy" DROP CONSTRAINT "FK_99a1b4e0833e712d7ab7a35e9e5"`);
        await queryRunner.query(`ALTER TABLE "user_login_strategy" DROP CONSTRAINT "FK_50f42109a0126ad8d00375ed8e6"`);
        await queryRunner.query(`DROP TABLE "measure"`);
        await queryRunner.query(`DROP TABLE "run"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "admin_login_strategy"`);
        await queryRunner.query(`DROP TABLE "user_login_strategy"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
