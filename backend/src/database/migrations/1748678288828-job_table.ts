import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobTable1748678288828 implements MigrationInterface {
  name = 'JobTable1748678288828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary"`);
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_salary_type_enum" AS ENUM('Thương lượng', 'Lên đến', 'Khoảng', 'Tối thiểu')`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_type" "public"."jobs_salary_type_enum"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_min" integer`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_max" integer`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_unit" character varying`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "CHK_39e85fcbf1709900afc96d0faa" CHECK (salary_min <= salary_max)`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "UQ_5d8638d36b5e8b367bc7b2c2ce0" UNIQUE ("company_id", "title")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "UQ_5d8638d36b5e8b367bc7b2c2ce0"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "CHK_39e85fcbf1709900afc96d0faa"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_unit"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_max"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_min"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_type"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_salary_type_enum"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary" character varying`);
  }
}
