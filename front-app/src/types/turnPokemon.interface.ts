import { Pokemon } from "./pokemon.interface";

export interface TurnPokemon {
    id:          string;
    turn_hp:     number;
    damage_done: number;
    pokemon:     Pokemon;
}
