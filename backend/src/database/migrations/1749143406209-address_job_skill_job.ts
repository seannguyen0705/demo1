import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressJobSkillJob1749143406209 implements MigrationInterface {
  name = 'AddressJobSkillJob1749143406209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_601fd5d085891783c5deaf9829e"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "FK_a087d81ebf8002c99f755a10dd4"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_7c0a3c52e77f9d9d839fdbb14b6"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "FK_4f7427e13d249156f37669e7127"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "UQ_aeaa32742128ed26b2f4ffde179"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "UQ_cc853451c17c3913492abc1e6e6"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "PK_87c4a6e5e3165cfa167db6e9728"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "PK_79dc7f5be80bfe7a4e590a71041"`);
    await queryRunner.query(`ALTER TABLE "job_skills" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP COLUMN "updated_at"`);
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
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "PK_aeaa32742128ed26b2f4ffde179" PRIMARY KEY ("job_id", "address_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "PK_cc853451c17c3913492abc1e6e6" PRIMARY KEY ("job_id", "skill_id")`,
    );
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
    await queryRunner.query(`ALTER TABLE "job_skills" DROP CONSTRAINT "PK_cc853451c17c3913492abc1e6e6"`);
    await queryRunner.query(`ALTER TABLE "job_addresses" DROP CONSTRAINT "PK_aeaa32742128ed26b2f4ffde179"`);
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
      `ALTER TABLE "job_addresses" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "job_skills" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "PK_79dc7f5be80bfe7a4e590a71041" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "job_addresses" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "PK_87c4a6e5e3165cfa167db6e9728" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "UQ_cc853451c17c3913492abc1e6e6" UNIQUE ("job_id", "skill_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_addresses" ADD CONSTRAINT "UQ_aeaa32742128ed26b2f4ffde179" UNIQUE ("job_id", "address_id")`,
    );
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
