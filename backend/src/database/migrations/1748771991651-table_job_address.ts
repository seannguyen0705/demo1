import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableJobAddress1748771991651 implements MigrationInterface {
  name = 'TableJobAddress1748771991651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "job_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_87c4a6e5e3165cfa167db6e9728" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`DROP TABLE "job_addresses"`);
  }
}
