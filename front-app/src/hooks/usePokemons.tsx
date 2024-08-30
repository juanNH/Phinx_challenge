import { useEffect, useRef, useState } from "react"
import { DataState } from "../types/commons.interface"
import { getPokemons } from "../services/pokemon/get.pokemons.service";
import { Pokemon } from "../types/pokemon.interface";


/**
 * Hook for pokemons.
 * @returns methods and data.
 */
export const usePokemons = () => {
    const controller = useRef<AbortController>(new AbortController());
    const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([])
    const [pokemons, setPokemons] = useState<DataState<Pokemon[]>>({
        isLoading: true,
        isError: false,
        data: []
    })
    /**
     * Add to list of selected pokemons.
     * @param pokemon pokemon to add.
     */
    const handleAddSelectedPokemons = (pokemon: Pokemon) => {
        setSelectedPokemons([...selectedPokemons, pokemon])
    }

    /**
     * Remove selected pokemon by id.
     * @param idPokemon id of pokemon to remove.
     */
    const handleRemoveSelectedPokemons = (idPokemon: string) => {
        setSelectedPokemons([...selectedPokemons].filter((pokemon) => {
            return pokemon.id !== idPokemon
        }))

    }

    /**
     * Fetch list of pokemons
     */
    const handlePokemonFetch = async () => {
        try {
            setPokemons({
                ...pokemons,
                isLoading: true,
            })
            const pokemonResponse = await getPokemons({ version: 1, signal: controller.current.signal });
            setPokemons({
                data: pokemonResponse?.data.pokemons ?? [],
                isLoading: false,
                isError: true,
            })
        } catch (err) {
            console.error(err)
            setPokemons({
                data: [],
                isLoading: false,
                isError: true,
            })
        }
    }
    useEffect(() => {
        handlePokemonFetch()
        return () => {
            controller.current.abort();
        }
    }, [])

    return { pokemons, selectedPokemons, handleRemoveSelectedPokemons, handleAddSelectedPokemons }
}
