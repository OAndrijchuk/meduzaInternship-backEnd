import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyEmployeeEntity1702409347095 implements MigrationInterface {
    name = 'CompanyEmployeeEntity1702409347095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_invite" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "status" "public"."company_invite_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "userId" integer, CONSTRAINT "PK_7c86e1788d1bb358b229beb9c18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_request" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "status" "public"."user_request_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "company" integer, "user" integer, CONSTRAINT "PK_5a8702f28aa636f59038532bb85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("companyId" SERIAL NOT NULL, "companyName" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_81611e86d930483997273420166" PRIMARY KEY ("companyId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL DEFAULT 'user', "email" character varying NOT NULL, "password" character varying NOT NULL, "isVerify" boolean NOT NULL DEFAULT false, "verificationKey" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_63301650f99948e1ff5e0af00b" UNIQUE ("tokenId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "refreshToken" character varying NOT NULL DEFAULT '', "accessToken" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_invite" ADD CONSTRAINT "FK_42a46bce56041252293c0b192e4" FOREIGN KEY ("companyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_invite" ADD CONSTRAINT "FK_e7bbd9e0d4b2b43679af4184df0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_request" ADD CONSTRAINT "FK_6529a6b3122ad923b4e7133622a" FOREIGN KEY ("company") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_request" ADD CONSTRAINT "FK_8b373c678d2b5b4ddcf70d8f16b" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_ee87438803acb531639e8284be0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_63301650f99948e1ff5e0af00b5" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_employee_user" ADD CONSTRAINT "FK_4f4ccf2f676cd340b56d741f034" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_employee_user" ADD CONSTRAINT "FK_cb3390046ed2717fb7e43c9cd3c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_my_work_company" ADD CONSTRAINT "FK_cc35bec2b1e3d2a75ccdbf135ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_my_work_company" ADD CONSTRAINT "FK_b03d1639e5c52ef48e0fabad887" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_my_work_company" DROP CONSTRAINT "FK_b03d1639e5c52ef48e0fabad887"`);
        await queryRunner.query(`ALTER TABLE "user_my_work_company" DROP CONSTRAINT "FK_cc35bec2b1e3d2a75ccdbf135ec"`);
        await queryRunner.query(`ALTER TABLE "company_employee_user" DROP CONSTRAINT "FK_cb3390046ed2717fb7e43c9cd3c"`);
        await queryRunner.query(`ALTER TABLE "company_employee_user" DROP CONSTRAINT "FK_4f4ccf2f676cd340b56d741f034"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_63301650f99948e1ff5e0af00b5"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_ee87438803acb531639e8284be0"`);
        await queryRunner.query(`ALTER TABLE "user_request" DROP CONSTRAINT "FK_8b373c678d2b5b4ddcf70d8f16b"`);
        await queryRunner.query(`ALTER TABLE "user_request" DROP CONSTRAINT "FK_6529a6b3122ad923b4e7133622a"`);
        await queryRunner.query(`ALTER TABLE "company_invite" DROP CONSTRAINT "FK_e7bbd9e0d4b2b43679af4184df0"`);
        await queryRunner.query(`ALTER TABLE "company_invite" DROP CONSTRAINT "FK_42a46bce56041252293c0b192e4"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user_request"`);
        await queryRunner.query(`DROP TABLE "company_invite"`);
    }

}
