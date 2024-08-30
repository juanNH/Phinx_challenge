import { TurnPokemon } from "./turnPokemon.interface";

export interface Turn {
    id:          string;
    turn_number: number;
    turnPokemon: TurnPokemon;
}