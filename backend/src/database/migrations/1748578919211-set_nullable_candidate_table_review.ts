import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetNullableCandidateTableReview1748578919211 implements MigrationInterface {
  name = 'SetNullableCandidateTableReview1748578919211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_d0d744d75117b34990958d3fb35"`);
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "UQ_90d3667b8622d95f3cd7ad126bc"`);
    await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "candidate_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "UQ_90d3667b8622d95f3cd7ad126bc" UNIQUE ("candidate_id", "company_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_d0d744d75117b34990958d3fb35" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_d0d744d75117b34990958d3fb35"`);
    await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "UQ_90d3667b8622d95f3cd7ad126bc"`);
    await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "candidate_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "UQ_90d3667b8622d95f3cd7ad126bc" UNIQUE ("candidate_id", "company_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_d0d744d75117b34990958d3fb35" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
