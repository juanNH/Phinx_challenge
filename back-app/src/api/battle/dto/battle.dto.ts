import { ApiProperty } from "@nestjs/swagger";

export class BattleDto {
    @ApiProperty({ description: 'Id of first pokemon', required: true })
    id_pokemon1: string;
    @ApiProperty({ description: 'Id of second pokemon', required:true })
    id_pokemon2: string;
}
