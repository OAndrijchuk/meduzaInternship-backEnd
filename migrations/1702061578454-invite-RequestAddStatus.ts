import { MigrationInterface, QueryRunner } from "typeorm";

export class InviteRequestAddStatus1702061578454 implements MigrationInterface {
    name = 'InviteRequestAddStatus1702061578454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_invite_status_enum" AS ENUM('pending', 'fulfilled', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "company_invite" ADD "status" "public"."company_invite_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`CREATE TYPE "public"."user_request_status_enum" AS ENUM('pending', 'fulfilled', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "user_request" ADD "status" "public"."user_request_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_request" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "company_invite" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."company_invite_status_enum"`);
    }

}
