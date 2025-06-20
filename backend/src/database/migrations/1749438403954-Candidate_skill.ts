import { SkillYear } from '@/common/enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CandidateSkill1749438403954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidate_skills',
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
            name: 'skill_id',
            type: 'uuid',
          },
          {
            name: 'skill_year',
            type: 'enum',
            enum: Object.values(SkillYear),
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
    await queryRunner.dropTable('candidate_skills');
    await queryRunner.query(`DROP TYPE IF EXISTS "skill_year_enum"`);
  }
}
