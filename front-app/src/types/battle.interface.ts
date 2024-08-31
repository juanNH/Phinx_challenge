import { Pokemon } from "./pokemon.interface";
import { Turn } from "./turn.interface";

export interface Battle {
    id:             string;
    pokemon_winner: Pokemon;
    pokemon_losser: Pokemon;
    turns:          Turn[];
}