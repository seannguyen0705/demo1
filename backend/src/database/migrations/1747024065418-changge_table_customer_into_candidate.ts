import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChanggeTableCustomerIntoCandidate1747024065418 implements MigrationInterface {
  name = 'ChanggeTableCustomerIntoCandidate1747024065418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."candidates_gender_enum" AS ENUM('male', 'female', 'other')`);
    await queryRunner.query(
      `CREATE TABLE "candidates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "bod" date, "gender" "public"."candidates_gender_enum", "phone_number" character varying NOT NULL, CONSTRAINT "UQ_c0de76a18c2a505ceb016746822" UNIQUE ("email"), CONSTRAINT "UQ_e9aae9c8df7ce4bc2e356b57219" UNIQUE ("phone_number"), CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "candidates"`);
    await queryRunner.query(`DROP TYPE "public"."candidates_gender_enum"`);
  }
}
