import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SaveJob1749444790335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'save_jobs',
        uniques: [
          {
            name: 'unique_save_job_candidate',
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
            type: 'timestamptz',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('save_jobs');
  }
}
