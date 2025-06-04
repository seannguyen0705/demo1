import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCandidateidInTableCv1749044168924 implements MigrationInterface {
  name = 'RenameCandidateidInTableCv1749044168924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cvs" DROP COLUMN "candidte_id"`);
    await queryRunner.query(`ALTER TABLE "cvs" DROP CONSTRAINT "FK_a0572773942febe16e5466eb2f4"`);
    await queryRunner.query(`ALTER TABLE "cvs" ALTER COLUMN "candidate_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD CONSTRAINT "FK_a0572773942febe16e5466eb2f4" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cvs" DROP CONSTRAINT "FK_a0572773942febe16e5466eb2f4"`);
    await queryRunner.query(`ALTER TABLE "cvs" ALTER COLUMN "candidate_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD CONSTRAINT "FK_a0572773942febe16e5466eb2f4" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "cvs" ADD "candidte_id" character varying NOT NULL`);
  }
}
