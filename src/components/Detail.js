import React, { useState, useEffect } from 'react';
import { results } from '../data';
import SimpleImageSlider from 'react-simple-image-slider';
import './Detail.css';


export default function Detail() {

  const [details, setDetails] = useState({});

  const [images, setImages] = useState([]);

  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true,
    controls: false
  };

  
  
  

  useEffect(() => {
    async function load() {
     
      //setDetails(results[0]);
      const aSingleHouse = results[0];
    }
    load();
    
    const imageArray = results[0].photos.map((photo) => { return { 'url': photo.href };});
    setImages(imageArray);
  }, []); 
  console.log(images);  


  return (
    <div className="detail-page">
      <h1>{results[0].location.address.line}</h1>
      <h2 className="sub-heading">{results[0].branding[0].type} | ${results[0].list_price} | {results[0].location.address.city}, {results[0].location.address.state}</h2>
      { images.length > 1 && <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />}
      {results[0].flags.is_new_listing && <p>This is a New Listing!</p>}
      
    </div>
  );
}
