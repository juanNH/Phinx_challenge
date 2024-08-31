import { Pokemon } from '../../../types/pokemon.interface'
import { DataState } from '../../../types/commons.interface';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid2 as Grid, Typography } from '@mui/material';
import { useMemo } from 'react';

interface Props {
    pokemons: DataState<Pokemon[]>;
    handleChangePokemon: (pokemon: Pokemon) => void;
    selectedPokemons: Pokemon[];
}
export const ListPokemonsBattle = ({ pokemons, handleChangePokemon, selectedPokemons }: Props) => {
    const selectedPokemonsIds = useMemo(() => selectedPokemons.map(pokemon => pokemon.id), [selectedPokemons.length])
    return (
        <Grid container spacing={2} component="article">
            {pokemons.data.map(pokemon => (
                <Card
                    key={pokemon.id}
                    component={Grid}
                    size={{ xs: 12, md: 4, lg: 2.4 }}
                    onClick={() => handleChangePokemon(pokemon)}
                    elevation={selectedPokemonsIds.includes(pokemon.id) ? 21 : 3}
                    aria-label={pokemon.name}
                    title={pokemon.name}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={pokemon.imageUrl}
                            alt={pokemon.name}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="h5">
                                {pokemon.name}
                            </Typography>
                            <Box >
                                <Typography>Attack: {pokemon.attack}</Typography>
                                <Typography>Defence: {pokemon.defense}</Typography>
                                <Typography>Speed: {pokemon.speed}</Typography>
                                <Typography>Hp: {pokemon.hp}</Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Grid>
    )
}
