import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCollumnJobLevel1748856284183 implements MigrationInterface {
  name = 'AddCollumnJobLevel1748856284183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_job_level_enum" AS ENUM('Intern', 'Fresher', 'Junior', 'Senior', 'Manager')`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ADD "job_level" "public"."jobs_job_level_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_level"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_job_level_enum"`);
  }
}
