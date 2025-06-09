import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDateToStringExperience1749449759053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "start_date" TYPE VARCHAR`);
    await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "end_date" TYPE VARCHAR`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "start_date" TYPE DATE`);
    await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "end_date" TYPE DATE`);
  }
}
