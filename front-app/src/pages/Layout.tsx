import { AppBar, Box, Button, Link, Toolbar } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'

export const Layout = () => {
    const navigation = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => navigation('/')}>Home</Button>
                    <Button color="inherit" onClick={() => navigation('/battle')}>Battle</Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flex: 1, padding: { sx: '0', md: '0 10rem', lg: '0 20rem' } }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ justifyContent: 'center', display: 'flex', alignContent: "center", backgroundColor: 'primary.main', p: "2rem" }}>
                Repo:
                <Link href="https://github.com/juanNH/Phinx_challenge" target="_blank" color="inherit">
                    Github
                </Link>
            </Box>
        </Box >

    )
}
