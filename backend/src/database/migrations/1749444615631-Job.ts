import { JobLevel, JobStatus, JobType, SalaryType } from '@/common/enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Job1749444615631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'jobs',
        uniques: [
          {
            name: 'unique_company_title',
            columnNames: ['company_id', 'title'],
          },
        ],
        checks: [
          {
            name: 'salary_min_less_than_salary_max',
            expression: 'salary_min <= salary_max',
          },
        ],
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
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'salary_type',
            type: 'enum',
            enum: Object.values(SalaryType),
            enumName: 'salary_type_enum',
            isNullable: true,
          },
          {
            name: 'salary_min',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'salary_max',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'job_type',
            type: 'enum',
            enum: Object.values(JobType),
            enumName: 'job_type_enum',
            isNullable: true,
          },
          {
            name: 'job_expertise',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'job_domain',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'job_level',
            type: 'enum',
            enum: Object.values(JobLevel),
            enumName: 'job_level_enum',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'requirement',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'benefit',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'view_count',
            type: 'integer',
            default: 0,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(JobStatus),
            enumName: 'job_status_enum',
            default: `'Bản nháp'::job_status_enum`,
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'expired_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jobs');
    await queryRunner.query(`DROP TYPE IF EXISTS "job_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "job_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "job_level_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "salary_type_enum"`);
  }
}
