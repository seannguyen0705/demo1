import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableJob1748595214922 implements MigrationInterface {
  name = 'CreateTableJob1748595214922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" ADD "job_expertise" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "job_domain" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "requirement" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "benefit" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "address" character varying array`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'draft'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "address" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "benefit"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "requirement"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_domain"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_expertise"`);
  }
}
