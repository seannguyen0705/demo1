import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableJobSkill1748598731520 implements MigrationInterface {
  name = 'TableJobSkill1748598731520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "job_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "UQ_119a6ffc60b3ce0973262b3a742" UNIQUE ("job_id", "skill_id"), CONSTRAINT "PK_e1469be6e4fdde092b3782c9e16" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "title" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "address" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "address" SET DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_type" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_expertise" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_domain" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "requirement" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "benefit" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_57d07c4be198a93a91fa8479819" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skill" ADD CONSTRAINT "FK_380feeef9ae48bb593b5acd9232" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_380feeef9ae48bb593b5acd9232"`);
    await queryRunner.query(`ALTER TABLE "job_skill" DROP CONSTRAINT "FK_57d07c4be198a93a91fa8479819"`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "benefit" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "requirement" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_domain" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_expertise" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "address" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "address" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "title" SET NOT NULL`);
    await queryRunner.query(`DROP TABLE "job_skill"`);
  }
}
