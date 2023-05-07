import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import  Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack>
          <Typography variant='caption' mb={1}>
            Information presented on this website about the Final Fantasy Trading Card Game, including FINAL FANTASY, SQUARE ENIX,
            the SQUARE ENIX logo, images, and text, are registered trademarks of Square Enix Holdings Co, Ltd. FFTCG Collector is 
            not affiliated with Square Enix Holdings Co, Ltd. 
          </Typography>
          <Typography variant='caption' mb={1}>
            Copyright © 2023 FFTCG Collector
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer;