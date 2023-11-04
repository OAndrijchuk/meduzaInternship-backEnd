import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1699119906485 implements MigrationInterface {
    name = ' $npmConfigName1699119906485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "token" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "token" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
    }

}
