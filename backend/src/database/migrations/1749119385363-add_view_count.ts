import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddViewCount1749119385363 implements MigrationInterface {
  name = 'AddViewCount1749119385363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_f362fc60eb6332d6f2deddd4615"`);
    await queryRunner.query(`ALTER TABLE "save_jobs" DROP CONSTRAINT "FK_6d7fd9f8a4e79556c8459f73495"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "view_count" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_f362fc60eb6332d6f2deddd4615" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "save_jobs" ADD CONSTRAINT "FK_6d7fd9f8a4e79556c8459f73495" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "save_jobs" DROP CONSTRAINT "FK_6d7fd9f8a4e79556c8459f73495"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP CONSTRAINT "FK_f362fc60eb6332d6f2deddd4615"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "view_count"`);
    await queryRunner.query(
      `ALTER TABLE "save_jobs" ADD CONSTRAINT "FK_6d7fd9f8a4e79556c8459f73495" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apply_jobs" ADD CONSTRAINT "FK_f362fc60eb6332d6f2deddd4615" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
