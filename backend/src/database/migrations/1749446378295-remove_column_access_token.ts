import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveColumnAccessToken1749446378295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tokens', 'access_token');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tokens',
      new TableColumn({
        name: 'access_token',
        type: 'varchar',
      }),
    );
  }
}
