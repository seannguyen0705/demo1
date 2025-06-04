import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManytooneAddress1749016928440 implements MigrationInterface {
  name = 'ManytooneAddress1749016928440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "UQ_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "UQ_aeaa32742128ed26b2f4ffde179" UNIQUE ("job_id", "address_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "UQ_aeaa32742128ed26b2f4ffde179"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "UQ_601fd5d085891783c5deaf9829e" UNIQUE ("address_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
