import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AttachMoney, Bathtub, Hotel, SquareFoot } from '@mui/icons-material';
import { createSavedHome, deleteSavedHome } from '../services/supabase-utils';
import { Link } from 'react-router-dom';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

//property card used on both search and profile page, extracted props to make it usable on both page data structures
export default function PropertyCard({ address,
  secondary_address,
  bed,
  bath,
  sqft,
  listprice,
  image,
  id,
  savedHomes, getSavedHomes }) {

  //function used on the card to save a home when the user clicks the heart icon
  async function saveHome() {
    const savedHome = {
      property_id: id,
      primary_photo: image,
      address: address,
      bedrooms: bed,
      bathrooms: bath,
      square_feet: sqft,
      list_price: listprice,
      secondary_address: secondary_address
    };
    await createSavedHome(savedHome);
    await getSavedHomes();
  }

  //function used if the user clicks on the heart icon of an already saved home
  //deletes the saved home from supabase as well as retrieves the new list of saved homes
  async function removeSavedHome() {
    await deleteSavedHome(id);
    await getSavedHomes();
  }

  //function to check if a property has already been saved by the user
  function isSaved(property_id) {
    const saved = savedHomes.find(item => Number(item.property_id) === Number(property_id));
    return Boolean(saved);
  }

  const BG_COLOR = '#40798c';
  const ICON_SYLES = { 
    color: '#1f363d',
    // zIndex tricks are just asking for trouble in the long run. in the future, see if you can find another way to accomplish this.
    zIndex: '9999',
    position: 'absolute',
    top: '100px',
    left: '240px',
   }

  // again, great work adapting MUI to your purposes.
  return (
    // so, you have a lot of style polluting the app here. I think it would have made sense to dig into MUI's theme API to figure out how to adjust all of these in one place
    <Card sx={{ width: 280, borderRadius: '20px', 
    // if you're committed to not using the MUI theme API (which makes sense--it's a lot!) then I'd recommend storing repeated strings/numbers in consts, like so
    backgroundColor: BG_COLOR, 
    margin: '20px', height: 350 }}>
      <Link to={`/detail/${id}`}>
        <CardHeader sx={{ backgroundColor: BG_COLOR, color: 'white', padding: '0px', margin: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'elipsis' }}
          title={address ? address : 'No Address Found'}
          subheader={secondary_address ? secondary_address : 'No Address Found'}
        />
     
        <CardMedia
          component="img"
          height="120"
          image={image}
          alt="front photo"
        /> 
      </Link>
      { !isSaved(id) ?
        <IconButton aria-label="add to favorites" onClick={saveHome} sx={ICON_SYLES}>
          <FavoriteTwoToneIcon sx={{ color: '#cfe0c3', fontSize: '30px' }} className='favorite-home' />
        </IconButton>
        :
        <IconButton aria-label="remove from favorites" onClick={removeSavedHome} sx={ICON_SYLES}>
          <FavoriteIcon sx={{ color: '#D72638', fontSize: '30px' }} className='remove-home' />
        </IconButton>
      }
      <Link to={`/detail/${id}`}>
        <CardContent sx={{ backgroundColor: 'white' }} className='flex-row'>
          <div className='flex-column'>
            <IconButton aria-label="bedrooms">
              <Hotel/>
              <Typography sx={{ margin: '3px', fontWeight: 'bolder' }}>{`${bed ? bed : '0'} beds`}</Typography>
            </IconButton>
            <IconButton aria-label="bathrooms">
              <Bathtub/>
              <Typography sx={{ margin: '3px', fontWeight: 'bolder' }}>{`${bath ? bath : '0'} bath`}</Typography>
            </IconButton>
          </div>
          <div className='flex-column'>
            <IconButton aria-label="list price">
              <AttachMoney sx={{ color: BG_COLOR }}/>
              <Typography sx={{ margin: '3px', fontWeight: 'bolder', color: BG_COLOR, fontSize: '17px' }}>{`$${listprice ? listprice.toLocaleString('en-US') : 'No List Price'}`}</Typography>
            </IconButton>
            <IconButton aria-label="square feet">
              <SquareFoot/>
              <Typography sx={{ margin: '3px', fontWeight: 'bolder' }}>{`${sqft ? sqft : '0'} sq ft`}</Typography>
            </IconButton>
          </div>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        
      </CardActions>
    </Card>
  );
}
