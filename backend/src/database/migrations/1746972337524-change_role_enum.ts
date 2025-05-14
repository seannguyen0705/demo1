import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoleEnum1746972337524 implements MigrationInterface {
  name = 'ChangeRoleEnum1746972337524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."tokens_user_role_enum" RENAME TO "tokens_user_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tokens_user_role_enum" AS ENUM('customer', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" TYPE "public"."tokens_user_role_enum" USING "user_role"::"text"::"public"."tokens_user_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" SET DEFAULT 'customer'`,
    );
    await queryRunner.query(`DROP TYPE "public"."tokens_user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."admins_gender_enum" RENAME TO "admins_gender_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admins_gender_enum" AS ENUM('male', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ALTER COLUMN "gender" TYPE "public"."admins_gender_enum" USING "gender"::"text"::"public"."admins_gender_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."admins_gender_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."customers_gender_enum" RENAME TO "customers_gender_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."customers_gender_enum" AS ENUM('male', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "gender" TYPE "public"."customers_gender_enum" USING "gender"::"text"::"public"."customers_gender_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."customers_gender_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."customers_gender_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "gender" TYPE "public"."customers_gender_enum_old" USING "gender"::"text"::"public"."customers_gender_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."customers_gender_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."customers_gender_enum_old" RENAME TO "customers_gender_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admins_gender_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ALTER COLUMN "gender" TYPE "public"."admins_gender_enum_old" USING "gender"::"text"::"public"."admins_gender_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."admins_gender_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."admins_gender_enum_old" RENAME TO "admins_gender_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tokens_user_role_enum_old" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" TYPE "public"."tokens_user_role_enum_old" USING "user_role"::"text"::"public"."tokens_user_role_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "user_role" SET DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TYPE "public"."tokens_user_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."tokens_user_role_enum_old" RENAME TO "tokens_user_role_enum"`,
    );
  }
}
