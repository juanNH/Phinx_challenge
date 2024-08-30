import { useState } from 'react'
import { Pokemon } from '../types/pokemon.interface'
import { Nullable } from '../types/commons.interface'
import { postBattle } from '../services/battle/post.battle.service'
import { getRandomInteger } from '../helpers'


/**
 * Hook for battle.
 * @returns Methods and data.
 */
export const useBattle = () => {
    const [pokemonsBattle, setPokemonsBattle] = useState<IPokemonBattle>({
        pokemon1: null,
        pokemon2: null,
        winner: null,
        isLoading: false,
        isError: false,
    })

    /**
     * Change pokemons for battle.
     * @param pokemon pokemon selected.
     * @param handleAddSelectedPokemons callback to check pokemon.
     */
    const handleChangePokemon = (pokemon: Pokemon, handleAddSelectedPokemons: (pokemon: Pokemon) => void) => {
        if (!pokemonsBattle.pokemon1) {
            setPokemonsBattle({
                ...pokemonsBattle,
                pokemon1: pokemon,
                isError: false,
                winner: null,
            })
            handleAddSelectedPokemons(pokemon);
        } else if (!pokemonsBattle.pokemon2) {
            setPokemonsBattle({
                ...pokemonsBattle,
                pokemon2: pokemon,
                isError: false,
                winner: null,
            })
            handleAddSelectedPokemons(pokemon);
        }
    }

    /**
     * Remove pokemon selected.
     * @param idPokemon id of pokemon to remove.
     * @param handleRemoveSelectedPokemons callback to remove checked pokemon.
     */
    const handleRemovePokemon = (idPokemon: string, handleRemoveSelectedPokemons: (idPokemon: string) => void) => {
        if (pokemonsBattle.pokemon1 && pokemonsBattle.pokemon1.id === idPokemon) {
            setPokemonsBattle({
                ...pokemonsBattle,
                pokemon1: null,
                isError: false,
                winner: null,
            })
            handleRemoveSelectedPokemons(idPokemon);
        } else if (pokemonsBattle.pokemon2 && pokemonsBattle.pokemon2.id === idPokemon) {
            setPokemonsBattle({
                ...pokemonsBattle,
                pokemon2: null,
                isError: false,
                winner: null,
            })
            handleRemoveSelectedPokemons(idPokemon);
        }
    }

    /**
     * Choose a random battle, if battle is the same, its keep choosing until it get 10 tries.
     * @param pokemons List of pokemons
     */
    const randomBattleSelectPokemon = (pokemons: Pokemon[]) => {
        let randomIndex1 = 0;
        let randomIndex2 = 0;
        let tries = 0;
        do {
            randomIndex1 = getRandomInteger(0, pokemons.length - 1);
            randomIndex2 = getRandomInteger(0, pokemons.length - 1);
            tries++;
        } while ((
            (pokemonsBattle.pokemon1?.id === pokemons[randomIndex1].id && pokemonsBattle.pokemon2?.id === pokemons[randomIndex2].id)
            || (pokemonsBattle.pokemon1?.id === pokemons[randomIndex2].id && pokemonsBattle.pokemon2?.id === pokemons[randomIndex1].id)) && tries < 10);

        setPokemonsBattle({
            ...pokemonsBattle,
            pokemon1: pokemons[randomIndex1],
            pokemon2: pokemons[randomIndex2],
            isError: false,
            winner: null,
        })
    }

    /**
     * Call api for battle 2 pokemons selected.
     */
    const handleBattle = async () => {
        if (!pokemonsBattle.pokemon1 || !pokemonsBattle.pokemon2) {
            return;
        }
        try {
            setPokemonsBattle({
                ...pokemonsBattle,
                isLoading: true,
            })
            const battleResponse = await postBattle({
                body: {
                    id_pokemon1: pokemonsBattle.pokemon1.id,
                    id_pokemon2: pokemonsBattle.pokemon2.id
                }
            });
            setPokemonsBattle({
                ...pokemonsBattle,
                winner: battleResponse.data.pokemon_winner,
                isLoading: false,
            })
        } catch (error) {
            console.error(error);
            setPokemonsBattle({
                ...pokemonsBattle,
                isLoading: false,
                isError: true,
            })
        }

    }

    return {
        pokemonsBattle,
        handleChangePokemon,
        handleRemovePokemon,
        handleBattle,
        randomBattleSelectPokemon,
    }
}


interface IPokemonBattle {
    pokemon1: Nullable<Pokemon>;
    pokemon2: Nullable<Pokemon>;
    winner: Nullable<Pokemon>;
    isLoading: boolean;
    isError: boolean,
}
