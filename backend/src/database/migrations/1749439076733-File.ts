import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class File1749439076733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'format',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
