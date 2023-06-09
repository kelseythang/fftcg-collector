import { useContext } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { AppContext } from '../../contexts/AppContext';
import ExpansionCard from './ExpansionCard';
import PageTitle from '../../components/PageTitle';

const ExpansionList = () => {
  const { expansions } = useContext(AppContext);

  return (
    <Box sx={{ flexDirection: 'column' }} className='container'>
      <PageTitle title='Browse Sets' />
      <Grid container spacing={2}> 
        { !expansions ? <CircularProgress /> :
          expansions.map(expansion => (
            <Grid key={expansion.name} xs={12} sm={6}> 
              <ExpansionCard
                name={expansion.name}
                releaseDate={expansion.release_date}
                image={expansion.image_url}
                stats={expansion.percent_collected}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default ExpansionList;