import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Company1749440695349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
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
            isUnique: true,
          },
          {
            name: 'size',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'industry',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'working_day',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'working_time',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'overview',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'benefits',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'website',
            type: 'varchar',
          },
          {
            name: 'background_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'logo_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'proof_id',
            type: 'uuid',
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'employer_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['employer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employers',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['background_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'files',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['logo_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'files',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['proof_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'files',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
