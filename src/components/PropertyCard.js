import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AttachMoney, Bathtub, Hotel, SquareFoot } from '@mui/icons-material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PropertyCard({ home }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 300, borderRadius: '20px', backgroundColor: '#40798c', margin: '20px' }}>
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
          <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`$${home.list_price}`}</Typography>
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: 'white' }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ color: 'white' }}>
          <Typography variant="body2">
          Dreamy Richmond Bungalow! Watch the world go by on your full-width front porch. 
          Entertain in your extra large living room with built-ins and a fireplace wood stove. 
          Dinners are a joy in the formal dining with built-ins and wainscoting. Tastefully 
          remodeled kitchen. Main floor bedroom and updated full bathroom. Upstairs are 2 
          more spacious bedrooms and a full bath. Lower level has a bonus office/gym but 
          could be so much more! Professionally landscaped yard and top rated schools. 92 Walk Score!
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
