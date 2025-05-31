import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnumSalarytypeTableJob1748680554231 implements MigrationInterface {
  name = 'AddEnumSalarytypeTableJob1748680554231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_unit"`);
    await queryRunner.query(`CREATE TYPE "public"."jobs_salary_unit_enum" AS ENUM('VND', 'USD')`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_unit" "public"."jobs_salary_unit_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_unit"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_salary_unit_enum"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_unit" character varying`);
  }
}
