import { ApplyJobStatus } from '@/common/enums';
import { enumh } from '@/utils/helpers';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ApplyJob1749444759836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apply_jobs',
        uniques: [
          {
            name: 'unique_apply_job_candidate',
            columnNames: ['job_id', 'candidate_id'],
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
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'job_id',
            type: 'uuid',
          },
          {
            name: 'candidate_id',
            type: 'uuid',
          },
          {
            name: 'file_id',
            type: 'uuid',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'expected_address',
            type: 'varchar',
          },
          {
            name: 'message',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: enumh.getValuesAndToString<typeof ApplyJobStatus>(ApplyJobStatus),
            enumName: 'apply_job_status_enum',
            default: `'${ApplyJobStatus['Mới']}'`,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['job_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'jobs',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['candidate_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'candidates',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['file_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'files',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apply_jobs');
    await queryRunner.query(`DROP TYPE IF EXISTS "apply_job_status_enum"`);
  }
}
