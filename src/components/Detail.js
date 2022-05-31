import React, { useState, useEffect } from 'react';
import { results } from '../data';
import TinySlider from 'tiny-slider-react';
import 'tiny-slider/dist/tiny-slider.css';
import SimpleImageSlider from 'react-simple-image-slider';


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
    
    const imageArray = results[0].photos.map((photo) =>{ return { 'url': photo.href };});
    setImages(imageArray);
  }, []); 
  console.log(images);  


  return (
    <div>
      { images.length > 1 && <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />}
      {/* <TinySlider settings={settings}>
        {results[0].photos.map((photo) => <img key={photo.href} src={photo.href}/>) }
      </TinySlider> */}
      {}
      {/* <img src={results[0].photos[1].href}/> */}
      <p>{results[0].location.address.line}</p>
      <p>{results[0].location.address.city}, {results[0].location.address.state}</p>
      
    </div>
  );
}
