import { Gender, UserStatus } from '@/common/enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Admin1749440601387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: Object.values(Gender),
            enumName: 'gender_enum',
            isNullable: true,
          },

          {
            name: 'bod',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'avatar_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'account_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(UserStatus),
            enumName: 'user_status_enum',
            default: `'${UserStatus.ACTIVE}'`,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admins');
    await queryRunner.query(`DROP TYPE IF EXISTS "gender_enum"`);
  }
}
