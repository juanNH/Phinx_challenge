import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Pokemon } from '../../../types/pokemon.interface'
import { Nullable } from '../../../types/commons.interface';
import PowerBar from './PowerBar';

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
                        <PowerBar value={pokemon.attack} title={'Attack:'} />
                        <PowerBar value={pokemon.defense} title={'Defence:'} />
                        <PowerBar value={pokemon.speed} title={'Speed:'} />
                        <PowerBar value={pokemon.hp} title={'Hp:'} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
