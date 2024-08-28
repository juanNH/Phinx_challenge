import { ApiProperty } from "@nestjs/swagger";
import { Battle } from "../entities/battle.entity";

export class BattleListDto {
    @ApiProperty()
    total_battles: number
    @ApiProperty({ isArray: true, type: Battle })
    battles: Battle[];
}