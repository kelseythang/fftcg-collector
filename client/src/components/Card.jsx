import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/LibraryAdd';
import { AppContext } from '../contexts/AppContext';
import { useMode } from '../contexts/ThemeContext';
import CollectionDialogForm from '../pages/collection/CollectionDialogForm';
import SnackbarCustom from './SnackbarCustom';

const Card = ({ id, name, serial, image, variants }) => {
  const { user, setUser } = useContext(AppContext);
  const hasNormalVariant = variants && variants.some(variant => variant.name === 'Normal');
  const hasNormalFoilVariant = variants && variants.some(variant => variant.name === 'Normal Foil');
  const hasSpecialVariant = variants && variants.some(variant => variant.name === 'Special');
  const hasSpecialFoilVariant = variants && variants.some(variant => variant.name === 'Special Foil');
  const hasFullArtVariant = variants && variants.some(variant => variant.name === 'Full Art');
  const hasFullArtFoilVariant = variants && variants.some(variant => variant.name === 'Full Art Foil');
  const N = hasNormalVariant ? 'N' : null;
  const NF = hasNormalFoilVariant ? 'F' : null;
  const S = hasSpecialVariant ? 'S' : null;
  const SF = hasSpecialFoilVariant ? 'F' : null;
  const FA = hasFullArtVariant ? 'FA' : null;
  const FAF = hasFullArtFoilVariant ? 'FAF' : null;
  const [collection, setCollection] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [theme] = useMode();
  const location = useLocation();
  
  // set collection state based on user profile
  useEffect(() => {
    if (!openDialog) return; 
    const findCards = user.profile.collections?.filter(item => item.card.id === id);
    const collectedVariants = findCards.map(card => card.variant)
    setCollection(collectedVariants);
   }, [user, openDialog])

  // update user collection state
  const handleEditCollection = e => {
    const variantName = e.target.name;

    if (collection?.includes(variantName)) {
      const updatedVariants = collection.filter(variant => variant !== variantName)
      setCollection(updatedVariants)
    } else {
      setCollection([...collection, variantName])
    }
  }

  // POST for user to add or remove a card variant to their collection
  const handleSaveCollection = async (event) => {
    event.preventDefault();
 
    try {
      const res = await fetch('/update-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_id: id, variants: collection }),
      });
      if (!res.ok) {
        const errorData = await res.json();
      } else {
        const data = await res.json();
        setUser(data)
        setOpenDialog(false)
        setOpen(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Link 
          component={RouterLink} 
          to={location.pathname.includes('sets') ? `${location.pathname}/${serial.toLowerCase()}` : `/browse-cards/${serial.toLowerCase()}` } 
          color={theme.palette.mode === 'light' ? 'secondary.dark' : 'secondary.main'}>
            {name}
        </Link>
        <Typography variant='h5'>{serial}</Typography>
      </Stack>
      <img src={image} style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='body1'>{N} {NF} {S} {SF} {FA} {FAF}</Typography>
        {user && <IconButton onClick={() => setOpenDialog(true)}><AddIcon fontSize='small'/></IconButton>}
      </Stack>
      <Divider orientation='horizontal' sx={{ mt: 1, width: '100%' }} variant='fullWidth' />
      <CollectionDialogForm 
        open={openDialog} 
        onHandleDialogClose={() => setOpenDialog(false)}
        onHandleEditCollection={handleEditCollection}
        onSaveCollection={handleSaveCollection}
        cardId={id}
        variants={variants}
        collection={collection}
      />
      <SnackbarCustom
        type='success' 
        message='Collection Updated Successfully' 
        open={open}
        onHandleClose={reason => reason !== 'clickaway' && setOpen(false)}
      />
    </Box>
  )
}

export default Card;