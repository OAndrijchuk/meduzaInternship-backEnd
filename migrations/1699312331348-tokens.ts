import { MigrationInterface, QueryRunner } from "typeorm";

export class Tokens1699312331348 implements MigrationInterface {
    name = 'Tokens1699312331348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("userId" integer NOT NULL, "acesToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d417e5d35f2434afc4bd48cb4d2" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
