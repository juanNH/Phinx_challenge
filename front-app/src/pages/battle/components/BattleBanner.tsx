import { Box, Button, Typography } from '@mui/material'

interface Props {
  pokemon1Name: string | undefined;
  pokemon2Name: string | undefined;
  winnerName: string | undefined;
  isErrorBattle: boolean;
  randomBattleSelectPokemon: () => void;
  isLoadingBattle: boolean;
}
export const BattleBanner = ({ pokemon1Name = "", pokemon2Name = "", winnerName, isErrorBattle, randomBattleSelectPokemon, isLoadingBattle }: Props) => {
  const text = !pokemon1Name && !pokemon2Name ? "Choose fighters" : `${pokemon1Name} vs ${pokemon2Name}`;
  const textBattle = pokemon1Name && pokemon2Name && !winnerName ? "Start Battle!" : (winnerName ? `The winner is ${winnerName}!` : "")
  const errorText = "Sucedio un error en la pelea!";
  return (
    <Box
      component="article"
      sx={{
        margin: '2rem 0',
        textAlign: 'center',
        border: '1px solid #333',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#e0f7fa',
        borderRadius: '4px',
        padding: '1rem'
      }}>

      <Typography variant="h5" fontSize={"1rem"}>{text}</Typography>
      <Typography variant="h4" fontSize={"1rem"}>{isErrorBattle ? errorText : textBattle}</Typography>
      <Button
        sx={{ alignSelf: 'center', backgroundColor: "rgba(23, 207, 96)" }}
        variant="contained"
        aria-label='Random battle'
        title={"Random battle"}
        disabled={isLoadingBattle}
        onClick={randomBattleSelectPokemon}
      >Random pokemons for Battle
      </Button>
    </Box>
  )
}
