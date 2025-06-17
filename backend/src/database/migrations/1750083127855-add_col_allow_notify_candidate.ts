import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColAllowNotifyCandidate1750083127855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "candidates" ADD COLUMN "allow_notify" BOOLEAN NOT NULL DEFAULT FALSE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "allow_notify"`);
  }
}
