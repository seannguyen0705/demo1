import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CompanyAddress1749444422668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_addresses',
        columns: [
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
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'address_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'addresses',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company_addresses');
  }
}
