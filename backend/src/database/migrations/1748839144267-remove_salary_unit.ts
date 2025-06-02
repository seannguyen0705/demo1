import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSalaryUnit1748839144267 implements MigrationInterface {
  name = 'RemoveSalaryUnit1748839144267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_e56280dbc24fe63ba4c610b919f"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_unit"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_salary_unit_enum"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_e56280dbc24fe63ba4c610b919f" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_e56280dbc24fe63ba4c610b919f"`);
    await queryRunner.query(`CREATE TYPE "public"."jobs_salary_unit_enum" AS ENUM('VND', 'USD')`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_unit" "public"."jobs_salary_unit_enum"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_e56280dbc24fe63ba4c610b919f" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
