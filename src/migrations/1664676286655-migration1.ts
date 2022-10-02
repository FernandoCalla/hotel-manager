import { MigrationInterface, QueryRunner } from "typeorm";

export class migration11664676286655 implements MigrationInterface {
    name = 'migration11664676286655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "totalPrice" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reservation_room_days" DROP COLUMN "partialPriceDay"`);
        await queryRunner.query(`ALTER TABLE "reservation_room_days" ADD "partialPriceDay" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "roomPrice"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "roomPrice" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reservation_room" DROP COLUMN "partialPrice"`);
        await queryRunner.query(`ALTER TABLE "reservation_room" ADD "partialPrice" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "totalPrice" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "totalPrice" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reservation_room" DROP COLUMN "partialPrice"`);
        await queryRunner.query(`ALTER TABLE "reservation_room" ADD "partialPrice" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "roomPrice"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "roomPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation_room_days" DROP COLUMN "partialPriceDay"`);
        await queryRunner.query(`ALTER TABLE "reservation_room_days" ADD "partialPriceDay" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "totalPrice" integer NOT NULL`);
    }

}
