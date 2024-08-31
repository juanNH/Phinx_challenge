import { Box, Typography } from '@mui/material';

interface Props {
    value: number;
    title: string
}
const PowerBar = ({ title, value }: Props) => {
    const percentage = Math.min(Math.max(value, 0), 10) * 10;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1} width={"100%"} marginY={2}>
            <Typography variant="h6">{title}</Typography>
            <Box
                sx={{
                    width: '100%',
                    height: 15,
                    border: '1px solid #333',
                    borderRadius: 1,
                    backgroundColor: '#f7f7f7',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: '#86f686',
                        transition: 'width 0.3s ease-in-out',
                    }}
                />
            </Box>
        </Box>
    );
};

export default PowerBar;
