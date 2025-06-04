import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableSaveJob1749003617007 implements MigrationInterface {
  name = 'TableSaveJob1749003617007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "apply_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "job_id" character varying NOT NULL, "cv_id" uuid NOT NULL, "message" character varying, CONSTRAINT "PK_b57881aff6916ea6c5845b89d82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_271386e44a797ca1ea67e3f4edd" FOREIGN KEY ("cv_id") REFERENCES "cvs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_271386e44a797ca1ea67e3f4edd"`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP NOT NULL`);
    await queryRunner.query(`DROP TABLE "apply_jobs"`);
  }
}
