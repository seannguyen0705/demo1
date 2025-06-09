import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnumJobStatus1749284055076 implements MigrationInterface {
  name = 'EnumJobStatus1749284055076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_7c0a3c52e77f9d9d839fdbb14b6"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_4f7427e13d249156f37669e7127"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a087d81ebf8002c99f755a10dd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_601fd5d085891783c5deaf9829"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f7427e13d249156f37669e712"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7c0a3c52e77f9d9d839fdbb14b"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" ADD "status" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`CREATE INDEX "IDX_a087d81ebf8002c99f755a10dd" ON "job_addresses" ("job_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_601fd5d085891783c5deaf9829" ON "job_addresses" ("address_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_4f7427e13d249156f37669e712" ON "job_skills" ("job_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7c0a3c52e77f9d9d839fdbb14b" ON "job_skills" ("skill_id") `);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7c0a3c52e77f9d9d839fdbb14b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f7427e13d249156f37669e712"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_601fd5d085891783c5deaf9829"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a087d81ebf8002c99f755a10dd"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "apply_jobs" ADD "status" character varying NOT NULL DEFAULT 'Mới'`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7c0a3c52e77f9d9d839fdbb14b" ON "job_skills" ("skill_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_4f7427e13d249156f37669e712" ON "job_skills" ("job_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_601fd5d085891783c5deaf9829" ON "job_addresses" ("address_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_a087d81ebf8002c99f755a10dd" ON "job_addresses" ("job_id") `);
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_4f7427e13d249156f37669e7127" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_7c0a3c52e77f9d9d839fdbb14b6" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "FK_601fd5d085891783c5deaf9829e" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
