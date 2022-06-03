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
    <Card sx={{ width: 280, borderRadius: '20px', backgroundColor: '#40798c', margin: '20px', height: 350 }}>
      <Link to={`/detail/${id}`}>
        <CardHeader sx={{ backgroundColor: '#40798c', color: 'white', padding: '0px', margin: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'elipsis' }}
          title={address ? address : 'No Address Found'}
          subheader={secondary_address ? secondary_address : 'No Address Found'}
        />
      </Link>
      <CardMedia
        component="img"
        height="120"
        image={image}
        alt="front photo"
      />{ !isSaved(id) ?
        <IconButton aria-label="add to favorites" onClick={saveHome} sx={{ color: '#1f363d', zIndex: '9999', position: 'absolute', top: '100px', left: '240px' }}>
          <FavoriteTwoToneIcon sx={{ color: '#cfe0c3', fontSize: '30px' }} className='favorite-home' />
        </IconButton>
        :
        <IconButton aria-label="remove from favorites" onClick={removeSavedHome} sx={{ color: '#1f363d', zIndex: '9999', position: 'absolute', top: '100px', left: '240px' }}>
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
              <AttachMoney />
              <Typography sx={{ margin: '3px', fontWeight: 'bolder' }}>{`$${listprice ? listprice.toLocaleString('en-US') : 'No List Price'}`}</Typography>
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
