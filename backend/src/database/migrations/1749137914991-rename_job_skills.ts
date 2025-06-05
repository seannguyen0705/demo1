import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameJobSkills1749137914991 implements MigrationInterface {
  name = 'RenameJobSkills1749137914991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "job_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "UQ_cc853451c17c3913492abc1e6e6" UNIQUE ("job_id", "skill_id"), CONSTRAINT "PK_79dc7f5be80bfe7a4e590a71041" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_4f7427e13d249156f37669e7127" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_7c0a3c52e77f9d9d839fdbb14b6" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_7c0a3c52e77f9d9d839fdbb14b6"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_4f7427e13d249156f37669e7127"`);
    await queryRunner.query(`DROP TABLE "job_skills"`);
  }
}
