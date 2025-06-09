import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Review1749444894010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reviews',
        uniques: [
          {
            name: 'unique_review_candidate_company',
            columnNames: ['candidate_id', 'company_id'],
          },
        ],
        checks: [
          {
            name: 'review_rating_between_0_and_5',
            expression: 'rating >= 0 AND rating <= 5',
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
            name: 'rating',
            type: 'decimal',
            precision: 2,
            scale: 1,
            default: 5,
          },
          {
            name: 'comment',
            type: 'text',
          },
          {
            name: 'candidate_id',
            type: 'uuid',
          },
          {
            name: 'company_id',
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
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reviews');
  }
}
