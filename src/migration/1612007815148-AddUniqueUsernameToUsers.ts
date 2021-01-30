import {MigrationInterface, QueryRunner, TableIndex} from 'typeorm'

export class AddUniqueUsernameToUsers1612007815148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const index = new TableIndex({
        name: 'users_username',
        columnNames: ['username'],
        isUnique: true
      });

      await queryRunner.createIndex('users', index);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex('users', 'users_username');
    }

}
