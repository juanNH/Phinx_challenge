import { Grid2 as Grid } from "@mui/material"
import { Battle } from "../../types/battle.interface"
import { DataState } from "../../types/commons.interface"
import { BattleCard } from "./BattleCard"

interface Props {
    battles: DataState<Battle[]>
}
export const BattleResumen = ({ battles }: Props) => {
    if (battles.isLoading) {
        <>cargando...</>
    }
    if (battles.isError) {
        <>Error al obtener datos!</>
    }
    return (
        <Grid container spacing={2}>
            {battles.data.map(battle => (
                <Grid key={battle.id} size={{ sm: 12, md: 12, lg: 12 }}>
                    <BattleCard battle={battle} />
                </Grid>
            ))}
        </Grid>
    )
}
