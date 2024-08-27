const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init21724766382392 {
    name = 'Init21724766382392'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" varchar PRIMARY KEY NOT NULL, "id_winner" varchar, "id_losser" varchar)`);
        await queryRunner.query(`CREATE TABLE "turn" ("id" varchar PRIMARY KEY NOT NULL, "turn_number" integer NOT NULL, "id_battle" varchar)`);
        await queryRunner.query(`CREATE TABLE "turn_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "turn_hp" integer NOT NULL, "damage_done" integer NOT NULL, "id_turn" varchar, "id_pokemon" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_battle" ("id" varchar PRIMARY KEY NOT NULL, "id_winner" varchar, "id_losser" varchar, CONSTRAINT "FK_ffac801445e3e2cf5100a980565" FOREIGN KEY ("id_winner") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b94d0a830cac3bce3f5c3aa4e4a" FOREIGN KEY ("id_losser") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle"("id", "id_winner", "id_losser") SELECT "id", "id_winner", "id_losser" FROM "battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle" RENAME TO "battle"`);
        await queryRunner.query(`CREATE TABLE "temporary_turn" ("id" varchar PRIMARY KEY NOT NULL, "turn_number" integer NOT NULL, "id_battle" varchar, CONSTRAINT "FK_d00159d79d8873bb8b0bc8640bf" FOREIGN KEY ("id_battle") REFERENCES "battle" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_turn"("id", "turn_number", "id_battle") SELECT "id", "turn_number", "id_battle" FROM "turn"`);
        await queryRunner.query(`DROP TABLE "turn"`);
        await queryRunner.query(`ALTER TABLE "temporary_turn" RENAME TO "turn"`);
        await queryRunner.query(`CREATE TABLE "temporary_turn_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "turn_hp" integer NOT NULL, "damage_done" integer NOT NULL, "id_turn" varchar, "id_pokemon" varchar, CONSTRAINT "FK_3b8e3309434f6f2281e3c817428" FOREIGN KEY ("id_turn") REFERENCES "turn" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_feb7603dc0042e1e121b9c4bfe1" FOREIGN KEY ("id_pokemon") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_turn_pokemon"("id", "turn_hp", "damage_done", "id_turn", "id_pokemon") SELECT "id", "turn_hp", "damage_done", "id_turn", "id_pokemon" FROM "turn_pokemon"`);
        await queryRunner.query(`DROP TABLE "turn_pokemon"`);
        await queryRunner.query(`ALTER TABLE "temporary_turn_pokemon" RENAME TO "turn_pokemon"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "turn_pokemon" RENAME TO "temporary_turn_pokemon"`);
        await queryRunner.query(`CREATE TABLE "turn_pokemon" ("id" varchar PRIMARY KEY NOT NULL, "turn_hp" integer NOT NULL, "damage_done" integer NOT NULL, "id_turn" varchar, "id_pokemon" varchar)`);
        await queryRunner.query(`INSERT INTO "turn_pokemon"("id", "turn_hp", "damage_done", "id_turn", "id_pokemon") SELECT "id", "turn_hp", "damage_done", "id_turn", "id_pokemon" FROM "temporary_turn_pokemon"`);
        await queryRunner.query(`DROP TABLE "temporary_turn_pokemon"`);
        await queryRunner.query(`ALTER TABLE "turn" RENAME TO "temporary_turn"`);
        await queryRunner.query(`CREATE TABLE "turn" ("id" varchar PRIMARY KEY NOT NULL, "turn_number" integer NOT NULL, "id_battle" varchar)`);
        await queryRunner.query(`INSERT INTO "turn"("id", "turn_number", "id_battle") SELECT "id", "turn_number", "id_battle" FROM "temporary_turn"`);
        await queryRunner.query(`DROP TABLE "temporary_turn"`);
        await queryRunner.query(`ALTER TABLE "battle" RENAME TO "temporary_battle"`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" varchar PRIMARY KEY NOT NULL, "id_winner" varchar, "id_losser" varchar)`);
        await queryRunner.query(`INSERT INTO "battle"("id", "id_winner", "id_losser") SELECT "id", "id_winner", "id_losser" FROM "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "turn_pokemon"`);
        await queryRunner.query(`DROP TABLE "turn"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }
}
