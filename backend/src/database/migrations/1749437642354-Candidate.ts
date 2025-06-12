import { AuthBy, Gender, UserStatus } from '@/common/enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Candidate1749437642354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
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
            type: 'timestamptz',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
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
            name: 'auth_by',
            type: 'enum',
            enum: Object.values(AuthBy),
            enumName: 'auth_by_enum',
            default: `'local'::auth_by_enum`,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(UserStatus),
            enumName: 'user_status_enum',
            default: `'inactive'::user_status_enum`,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'personal_website',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'introduction',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidates');
    await queryRunner.query(`DROP TYPE IF EXISTS "gender_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "auth_by_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_status_enum"`);
  }
}
