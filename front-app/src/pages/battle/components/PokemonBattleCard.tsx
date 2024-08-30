import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Pokemon } from '../../../types/pokemon.interface'
import { Nullable } from '../../../types/commons.interface';

interface Props {
    pokemon: Nullable<Pokemon>;
    handleRemovePokemon: (idPokemon: string) => void;
}
export const PokemonBattleCard = ({ pokemon, handleRemovePokemon }: Props) => {
    if (!pokemon) {
        return <></>
    }
    return (
        <Card
            onClick={() => handleRemovePokemon(pokemon.id)}
            aria-label={pokemon.name}
            title={pokemon.name}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={pokemon.imageUrl}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {pokemon.name}
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography>Attack: {pokemon.attack}</Typography>
                        <Typography>Defence: {pokemon.defense}</Typography>
                        <Typography>Speed: {pokemon.speed}</Typography>
                        <Typography>Hp: {pokemon.hp}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
