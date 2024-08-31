import { Pokemon } from '../../../types/pokemon.interface'
import { Button, Grid2 as Grid } from '@mui/material';
import { PokemonBattleCard } from './PokemonBattleCard';
import { Nullable } from '../../../types/commons.interface';

interface Props {
    pokemon1: Nullable<Pokemon>;
    pokemon2: Nullable<Pokemon>;
    handleRemovePokemon: (idPokemon: string) => void;
    handleBattle: () => Promise<void>;
    isLoadingBattle: boolean;
}
export const PokemonBattle = ({ pokemon1, pokemon2, handleRemovePokemon, handleBattle, isLoadingBattle }: Props) => {
    if (pokemon1 === null && pokemon2 === null) {
        return <></>
    }
    return (
        <Grid container spacing={3} component="article" sx={{ padding: '2rem 0' }}>
            <Grid size={{ xs: 5, md: 5, lg: 5 }}>
                <PokemonBattleCard pokemon={pokemon1} handleRemovePokemon={handleRemovePokemon} />
            </Grid>
            <Grid size={{ xs: 2, md: 2, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Button
                    sx={{ alignSelf: 'center', backgroundColor: "rgba(23, 207, 96)" }}
                    variant="contained"
                    aria-label='Start battle'
                    title={"Start battle"}
                    disabled={!pokemon1 || !pokemon2 || isLoadingBattle}
                    onClick={handleBattle}
                >Start Battle
                </Button>
            </Grid>
            <Grid size={{ xs: 5, md: 5, lg: 5 }}>
                <PokemonBattleCard pokemon={pokemon2} handleRemovePokemon={handleRemovePokemon} />
            </Grid>
        </Grid>
    )
}
