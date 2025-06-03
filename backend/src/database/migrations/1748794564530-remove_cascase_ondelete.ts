import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCascaseOndelete1748794564530 implements MigrationInterface {
  name = 'RemoveCascaseOndelete1748794564530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_12b2775ccaf8767e3232378aac2"`);
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_12b2775ccaf8767e3232378aac2" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_6b4fe00df428535a92a7d22323c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_12b2775ccaf8767e3232378aac2"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_6b4fe00df428535a92a7d22323c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_12b2775ccaf8767e3232378aac2" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
