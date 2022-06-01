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


export default function PropertyCard({ address,
  secondary_address,
  bed,
  bath,
  sqft,
  listprice,
  image,
  id,
  savedHomes, getSavedHomes }) {
//   const { push } = useHistory();

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

  async function removeSavedHome() {
    await deleteSavedHome(id);
    await getSavedHomes();
  }

  function isSaved(property_id) {
    const saved = savedHomes.find(item => Number(item.property_id) === Number(property_id));
    return Boolean(saved);
  }

  return (
    <Card sx={{ width: 300, borderRadius: '20px', backgroundColor: '#40798c', margin: '20px' }}>
      <Link to={`/detail/${id}`}>
        <CardHeader sx={{ backgroundColor: '#40798c', color: 'white' }}
          title={address}
          subheader={secondary_address}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="front photo"
        />
        <CardContent sx={{ backgroundColor: 'white' }} className='flex-row'>
          <div className='flex-column'>
            <IconButton aria-label="bedrooms">
              <Hotel/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${bed} beds`}</Typography>
            </IconButton>
            <IconButton aria-label="bathrooms">
              <Bathtub/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${bath} baths`}</Typography>
            </IconButton>
            <IconButton aria-label="square feet">
              <SquareFoot/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${sqft} sq ft`}</Typography>
            </IconButton>
          </div>
          <IconButton aria-label="list price">
            <AttachMoney />
            <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`$${listprice.toLocaleString('en-US')}`}</Typography>
          </IconButton>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        { !isSaved(id) ?
          <IconButton aria-label="add to favorites" onClick={saveHome}>
            <FavoriteIcon sx={{ color: 'white' }} className='favorite-home' />
          </IconButton>
          :
          <IconButton aria-label="remove from favorites" onClick={removeSavedHome}>
            <FavoriteIcon sx={{ color: '#D72638' }} className='remove-home' />
          </IconButton>
        }
      </CardActions>
    </Card>
  );
}
