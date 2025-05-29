import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTable1748500075349 implements MigrationInterface {
  name = 'InitTable1748500075349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "experiences" DROP CONSTRAINT "FK_273cd8a8cf116d502fd173408cf"`);
    await queryRunner.query(`ALTER TABLE "candidates" RENAME COLUMN "authBy" TO "auth_by"`);
    await queryRunner.query(`ALTER TYPE "public"."candidates_authby_enum" RENAME TO "candidates_auth_by_enum"`);
    await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "jobType" TO "job_type"`);
    await queryRunner.query(`ALTER TYPE "public"."jobs_jobtype_enum" RENAME TO "jobs_job_type_enum"`);
    await queryRunner.query(
      `CREATE TABLE "cvs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "candidte_id" character varying NOT NULL, "file_id" uuid NOT NULL, "candidate_id" uuid, CONSTRAINT "PK_e7d8a4d55eb4e7a2e43bea8d83a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "workingDay"`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "workingTime"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "workTitle"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "companyName"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "startDate"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "endDate"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "candidateId"`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "working_day" character varying`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "working_time" character varying`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "work_title" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "company_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "start_date" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "end_date" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "candidate_id"`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "candidate_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD CONSTRAINT "FK_f624485191aee00cc75f9c1d7e6" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD CONSTRAINT "FK_a0572773942febe16e5466eb2f4" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD CONSTRAINT "FK_6429702419351f13887969a1def" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cvs" DROP CONSTRAINT "FK_6429702419351f13887969a1def"`);
    await queryRunner.query(`ALTER TABLE "cvs" DROP CONSTRAINT "FK_a0572773942febe16e5466eb2f4"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP CONSTRAINT "FK_f624485191aee00cc75f9c1d7e6"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "candidate_id"`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "candidate_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "work_title"`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "working_time"`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "working_day"`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "candidateId" uuid`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "endDate" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "startDate" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "companyName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "experiences" ADD "workTitle" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "workingTime" character varying`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "workingDay" character varying`);
    await queryRunner.query(`DROP TABLE "cvs"`);
    await queryRunner.query(`ALTER TYPE "public"."jobs_job_type_enum" RENAME TO "jobs_jobtype_enum"`);
    await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "job_type" TO "jobType"`);
    await queryRunner.query(`ALTER TYPE "public"."candidates_auth_by_enum" RENAME TO "candidates_authby_enum"`);
    await queryRunner.query(`ALTER TABLE "candidates" RENAME COLUMN "auth_by" TO "authBy"`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD CONSTRAINT "FK_273cd8a8cf116d502fd173408cf" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
