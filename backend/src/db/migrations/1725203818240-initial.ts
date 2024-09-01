import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1725203818240 implements MigrationInterface {
  name = "Initial1725203818240";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5e568e001f9d1b91f67815c580" ON "admin" ("username") `);
    await queryRunner.query(
      `CREATE TABLE "user_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "user_id" uuid, CONSTRAINT "PK_f97edf7f99f6880b40a4e25d2b8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_50f42109a0126ad8d00375ed8e" ON "user_login_strategy" ("user_id") `);
    await queryRunner.query(
      `CREATE TABLE "admin_login_strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "strategy_type" character varying NOT NULL, "strategy_data" jsonb NOT NULL, "admin_id" uuid, CONSTRAINT "PK_72e0d378c5b39edb116ccf71506" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_99a1b4e0833e712d7ab7a35e9e" ON "admin_login_strategy" ("admin_id") `);
    await queryRunner.query(
      `CREATE TABLE "run" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "metadata" jsonb NOT NULL, "user_id" uuid, CONSTRAINT "PK_804c38ffba92002c6d2c646dd46" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_ef2b93c8936fa4714939b46954" ON "run" ("key") `);
    await queryRunner.query(`CREATE INDEX "IDX_b1491c76828bcc9460824fba84" ON "run" ("started_at") `);
    await queryRunner.query(`CREATE INDEX "IDX_35e1125d87152b230664f12a6e" ON "run" ("ended_at") `);
    await queryRunner.query(`CREATE INDEX "IDX_5f8a163e576ca7272e869ac971" ON "run" ("user_id") `);
    await queryRunner.query(
      `CREATE TABLE "measure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "number" double precision NOT NULL, "run_id" uuid, CONSTRAINT "PK_ddc1ad2a86717cedc808809423e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_0f34661b3addbe53ea32219d8f" ON "measure" ("run_id") `);
    await queryRunner.query(
      `ALTER TABLE "user_login_strategy" ADD CONSTRAINT "FK_50f42109a0126ad8d00375ed8e6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "admin_login_strategy" ADD CONSTRAINT "FK_99a1b4e0833e712d7ab7a35e9e5" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "run" ADD CONSTRAINT "FK_5f8a163e576ca7272e869ac9713" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "measure" ADD CONSTRAINT "FK_0f34661b3addbe53ea32219d8f3" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_0f34661b3addbe53ea32219d8f3"`);
    await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_5f8a163e576ca7272e869ac9713"`);
    await queryRunner.query(`ALTER TABLE "admin_login_strategy" DROP CONSTRAINT "FK_99a1b4e0833e712d7ab7a35e9e5"`);
    await queryRunner.query(`ALTER TABLE "user_login_strategy" DROP CONSTRAINT "FK_50f42109a0126ad8d00375ed8e6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0f34661b3addbe53ea32219d8f"`);
    await queryRunner.query(`DROP TABLE "measure"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f8a163e576ca7272e869ac971"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_35e1125d87152b230664f12a6e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b1491c76828bcc9460824fba84"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ef2b93c8936fa4714939b46954"`);
    await queryRunner.query(`DROP TABLE "run"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_99a1b4e0833e712d7ab7a35e9e"`);
    await queryRunner.query(`DROP TABLE "admin_login_strategy"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_50f42109a0126ad8d00375ed8e"`);
    await queryRunner.query(`DROP TABLE "user_login_strategy"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5e568e001f9d1b91f67815c580"`);
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
