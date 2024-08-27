import { ApiProperty } from "@nestjs/swagger";
import { Pokemon } from "../entities/pokemon.entity";

export class PokemonListDto {
    @ApiProperty()
    total_pokemons: number
    @ApiProperty({ isArray: true, type: Pokemon })
    pokemons: Pokemon[];
}