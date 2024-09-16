import { MigrationInterface, QueryRunner } from "typeorm";

export class Next1726496641824 implements MigrationInterface {
  name = "Next1726496641824";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_password_reset" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reset_code" character varying NOT NULL,
                "expires_at" TIMESTAMP NOT NULL,
                "used_at" TIMESTAMP,
                "ip_address" character varying NOT NULL,
                "user_agent" character varying NOT NULL,
                "user_id" uuid,
                CONSTRAINT "PK_0b64db97b0338c8c7d8c1001746" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_user_password_reset_user_id" ON "user_password_reset" ("user_id")
        `);

    await queryRunner.query(`
            CREATE TABLE "admin_password_reset" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reset_code" character varying NOT NULL,
                "expires_at" TIMESTAMP NOT NULL,
                "used_at" TIMESTAMP,
                "ip_address" character varying NOT NULL,
                "user_agent" character varying NOT NULL,
                "admin_id" uuid,
                CONSTRAINT "PK_5b4a680a9b85f842f9f1d4f4c0e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_admin_password_reset_admin_id" ON "admin_password_reset" ("admin_id")
        `);

    await queryRunner.query(`
            ALTER TABLE "user_password_reset" ADD CONSTRAINT "FK_user_password_reset_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "admin_password_reset" ADD CONSTRAINT "FK_admin_password_reset_admin_id" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "admin_password_reset" DROP CONSTRAINT "FK_admin_password_reset_admin_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_password_reset" DROP CONSTRAINT "FK_user_password_reset_user_id"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_admin_password_reset_admin_id"
        `);
    await queryRunner.query(`
            DROP TABLE "admin_password_reset"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_user_password_reset_user_id"
        `);
    await queryRunner.query(`
            DROP TABLE "user_password_reset"
        `);
  }
}
