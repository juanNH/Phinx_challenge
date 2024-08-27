const { MigrationInterface, QueryRunner } = require("typeorm");
const fs = require('fs')
const path = require('path')
module.exports = class Population1724769079292 {

    async up(queryRunner) {
        const filePath = path.join(__dirname, './../pokemon.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('pokemon') 
          .values(data.pokemon)
          .execute();
    }

    async down(queryRunner) {
        await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from('pokemon')
        .execute();
    }

}
