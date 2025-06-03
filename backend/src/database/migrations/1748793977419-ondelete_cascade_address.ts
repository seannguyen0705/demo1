import { MigrationInterface, QueryRunner } from 'typeorm';

export class OndeleteCascadeAddress1748793977419 implements MigrationInterface {
  name = 'OndeleteCascadeAddress1748793977419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "UQ_601fd5d085891783c5deaf9829e" UNIQUE ("address_id")`,
    );
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "UQ_6b4fe00df428535a92a7d22323c" UNIQUE ("address_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_6b4fe00df428535a92a7d22323c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "FK_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "company_addresses" DROP CONSTRAINT "UQ_6b4fe00df428535a92a7d22323c"`);
    await queryRunner.query(
      `ALTER TABLE "company_addresses" ADD CONSTRAINT "FK_6b4fe00df428535a92a7d22323c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "UQ_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
