import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCompanyAddress1748786577441 implements MigrationInterface {
  name = 'TableCompanyAddress1748786577441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "company_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_cff628c622ac2c8f5a1927356d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_12b2775ccaf8767e3232378aac2" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_6b4fe00df428535a92a7d22323c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_12b2775ccaf8767e3232378aac2"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "address" character varying array NOT NULL DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "address" character varying array`);
    await queryRunner.query(`DROP TABLE "company_addresses"`);
  }
}
