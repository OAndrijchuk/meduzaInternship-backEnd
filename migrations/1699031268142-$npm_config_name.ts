import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1699031268142 implements MigrationInterface {
    name = ' $npmConfigName1699031268142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
