import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetConstraintOndeleteTableJobSkill1748599922650 implements MigrationInterface {
  name = 'SetConstraintOndeleteTableJobSkill1748599922650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"`);
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_380feeef9ae48bb593b5acd9232"`);
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_380feeef9ae48bb593b5acd9232" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_380feeef9ae48bb593b5acd9232"`);
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"`);
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_380feeef9ae48bb593b5acd9232" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
