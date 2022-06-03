import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Bungalow, VideogameAsset } from '@mui/icons-material';

export default function AboutCard({ name, image_url, bio, architecture, pinball, github_link, linkedin_link }) {
  return (
    // Standard card for each team member in the About page
    <div className='about-team flex-row'>
      <div className='about-name-img-container'>
        <h3 className='about-name'>{name}</h3>
        <img src={image_url} alt='' className='about-imgs' draggable='false'/>
      </div>
      <div className='about-bio-container'>
        <span className='about-bio'>{bio}</span>
        <IconButton sx={{ color: '#cfe0c3' }} aria-label="architecture">
          <Bungalow sx={{ color: 'white' }}/>
          <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`Favorite Architecture Style: `}</Typography>
          <Typography sx={{ margin: '3px' }}>{`${architecture}`}</Typography>
        </IconButton>
        <IconButton sx={{ color: '#cfe0c3' }} aria-label="architecture">
          <VideogameAsset sx={{ color: 'white' }}/>
          <Typography sx={{ marginLeft: '10px', fontWeight: 'bolder' }}>{`Favorite Vintage Pinball Game: `}</Typography>
          <Typography sx={{ margin: '3px' }}>{`${pinball}`}</Typography>
        </IconButton>
        <div className='flex-row'>
          <a href={github_link}><img className='icon' src='../assets/github-logo.png' /></a>
          <a href={linkedin_link}><img className='icon' src='../assets/linked-in-icon.png' /></a>
        </div>
      </div>
    </div>
  );
}
