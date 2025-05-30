import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTimeIntoTimeZoneBaseEntity1748590924775 implements MigrationInterface {
  name = 'ChangeTimeIntoTimeZoneBaseEntity1748590924775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "employers" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "employers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "employers" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "employers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidate_skills" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidate_skills" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidate_skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidate_skills" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "skills" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "skills" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "cvs" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "cvs" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "company_images" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "company_images" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "company_images" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "company_images" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "admins" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "admins" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "admins" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "admins" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "experiences" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "company_images" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "company_images" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "company_images" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "company_images" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "cvs" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "cvs" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "cvs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "skills" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "skills" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "skills" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidate_skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidate_skills" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidate_skills" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidate_skills" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "employers" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "employers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "employers" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "employers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
  }
}
