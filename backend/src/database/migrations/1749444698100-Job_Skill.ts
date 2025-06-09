import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class JobSkill1749444698100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'job_skills',
        columns: [
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
            isPrimary: true,
          },
          {
            name: 'skill_id',
            type: 'uuid',
            isPrimary: true,
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
            columnNames: ['skill_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'skills',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job_skills');
  }
}
