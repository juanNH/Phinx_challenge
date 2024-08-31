import { Typography } from "@mui/material"
import { useBattle, usePokemons } from "../../hooks";
import { ListPokemonsBattle } from "./components/ListPokemonsBattle";
import { PokemonBattle } from "./components/PokemonBattle";
import { BattleBanner } from "./components/BattleBanner";


export const BattlePage = () => {
    const {
        pokemons,
        selectedPokemons,
        handleRemoveSelectedPokemons,
        handleAddSelectedPokemons
    } = usePokemons();
    const {
        pokemonsBattle,
        handleChangePokemon,
        handleRemovePokemon,
        handleBattle,
        randomBattleSelectPokemon,
    } = useBattle(false);
    return (
        <>
            <Typography variant="h1" sx={{ fontSize: '2.5rem', margin: '1rem 0' }}>Battle of Pokemon</Typography>
            <Typography variant="h2" sx={{ fontSize: '1.8rem' }}>Select your pokemon</Typography>
            <ListPokemonsBattle
                pokemons={pokemons}
                handleChangePokemon={(pokemon) => handleChangePokemon(pokemon, handleAddSelectedPokemons)}
                selectedPokemons={selectedPokemons}
            />
            <BattleBanner
                pokemon1Name={pokemonsBattle.pokemon1?.name}
                pokemon2Name={pokemonsBattle.pokemon2?.name}
                winnerName={pokemonsBattle.winner?.name}
                isErrorBattle={pokemonsBattle.isError}
                isLoadingBattle={pokemonsBattle.isLoading}
                randomBattleSelectPokemon={() => randomBattleSelectPokemon(pokemons.data)}
            />
            <PokemonBattle
                pokemon1={pokemonsBattle.pokemon1}
                pokemon2={pokemonsBattle.pokemon2}
                handleRemovePokemon={(idPokemon) => handleRemovePokemon(idPokemon, handleRemoveSelectedPokemons)}
                handleBattle={handleBattle}
                isLoadingBattle={pokemonsBattle.isLoading}
            />
        </>
    )
}