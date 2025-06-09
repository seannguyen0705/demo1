import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Experience1749438066612 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'experiences',
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
            name: 'work_title',
            type: 'varchar',
          },
          {
            name: 'company_name',
            type: 'varchar',
          },
          {
            name: 'start_date',
            type: 'varchar',
          },
          {
            name: 'end_date',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'candidate_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable('experiences');
  }
}
