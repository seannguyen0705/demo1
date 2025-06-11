import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Cv1749439260970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cvs',
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
            name: 'candidate_id',
            type: 'uuid',
          },
          {
            name: 'file_id',
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
          {
            columnNames: ['file_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'files',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cvs');
  }
}
