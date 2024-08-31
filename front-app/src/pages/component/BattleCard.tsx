import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import { Battle } from '../../types/battle.interface'

interface Props {
    battle: Battle
}
export const BattleCard = ({ battle }: Props) => {
    return (
        <Card
            aria-label={"Battle id: " + battle.id}
            title={"Battle id: " + battle.id}
        >
            <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                    <CardMedia
                        component="img"
                        image={battle.pokemon_winner.imageUrl}
                        alt={battle.pokemon_winner.name}
                    />
                </Box>
                <Box>
                    <Typography>Ganador: {battle.pokemon_winner.name}</Typography>
                    <Typography>Rounds: {battle.turns.length}</Typography>
                </Box>
                <Box>
                    <CardMedia
                        component="img"
                        image={battle.pokemon_losser.imageUrl}
                        alt={battle.pokemon_losser.name}
                    />
                </Box>
            </CardActionArea>
        </Card>
    )
}
