import { NavLink as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const AppLogoNav = () => {
  return (
    <>
      {/* Add Logo Here */}
      <Typography
        variant='h5'
        noWrap
        component={RouterLink}
        to='/'
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'sans-serif',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        FFTCG Collector
      </Typography>
    </>

  )
}

export default AppLogoNav;