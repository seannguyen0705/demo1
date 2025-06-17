import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class SubscribeSkill1750127549368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscribe_skills',
        columns: [
          new TableColumn({ name: 'candidate_id', type: 'uuid' }),
          new TableColumn({ name: 'skill_id', type: 'uuid' }),
          new TableColumn({ name: 'province_id', type: 'uuid' }),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['candidate_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'candidates',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscribe_skills');
  }
}
