import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableApplyJob1749046344086 implements MigrationInterface {
  name = 'TableApplyJob1749046344086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_0947c5f58c0a37ca14c38404e15"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_401546624c3a3889fde40b6c684"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP COLUMN "candidate_id"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP COLUMN "file_id"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" ADD "cv_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_271386e44a797ca1ea67e3f4edd" FOREIGN KEY ("cv_id") REFERENCES "cvs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_271386e44a797ca1ea67e3f4edd"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP COLUMN "cv_id"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" ADD "file_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" ADD "candidate_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_401546624c3a3889fde40b6c684" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_0947c5f58c0a37ca14c38404e15" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
