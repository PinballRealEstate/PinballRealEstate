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


export default function PropertyCard({ home, savedHomes, getSavedHomes }) {
//   const { push } = useHistory();

  async function saveHome() {
    const savedHome = {
      property_id: home.property_id,
      primary_photo: home.primary_photo.href,
      address: home.location.address.line,
      bedrooms: home.description.beds,
      bathrooms: home.description.baths,
      square_feet: home.description.sqft,
      list_price: home.list_price
    };
    await createSavedHome(savedHome);
    await getSavedHomes();
  }

  async function removeSavedHome() {
    await deleteSavedHome(home.property_id);
    await getSavedHomes();
  }

  function isSaved(property_id) {
    const saved = savedHomes.find(item => Number(item.property_id) === Number(property_id));
    return Boolean(saved);
  }

  return (
    <Card sx={{ width: 300, borderRadius: '20px', backgroundColor: '#40798c', margin: '20px' }}>
      <Link to={`/detail/${home.property_id}`}>
        <CardHeader sx={{ backgroundColor: '#40798c', color: 'white' }}
          title={`${home.location.address.line}`}
          subheader={`${home.location.address.city}, ${home.location.address.state_code} ${home.location.address.postal_code}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={home.primary_photo.href}
          alt="front photo"
        />
        <CardContent sx={{ backgroundColor: 'white' }} className='flex-row'>
          <div className='flex-column'>
            <IconButton aria-label="bedrooms">
              <Hotel/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${home.description.beds} beds`}</Typography>
            </IconButton>
            <IconButton aria-label="bathrooms">
              <Bathtub/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${home.description.baths} baths`}</Typography>
            </IconButton>
            <IconButton aria-label="square feet">
              <SquareFoot/>
              <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`${home.description.sqft} sq ft`}</Typography>
            </IconButton>
          </div>
          <IconButton aria-label="list price">
            <AttachMoney />
            <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`$${home.list_price.toLocaleString('en-US')}`}</Typography>
          </IconButton>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        { !isSaved(home.property_id) ?
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
