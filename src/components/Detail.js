import React, { useState, useEffect } from 'react';
import { results } from '../data';
import SimpleImageSlider from 'react-simple-image-slider';
import './Detail.css';
import { useParams } from 'react-router-dom';
import { getSingleHome } from '../services/fetch-utils';


export default function Detail() {
  const { id } = useParams();
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
      const propertyInfo = await getSingleHome(id);
      console.log(propertyInfo);
      setDetails(propertyInfo);
    }
    load();
    
    const imageArray = details.property_detail.photos.map((photo) => { return { 'url': photo.href };});
    setImages(imageArray);
  }, []); 


  return (
    <div className="detail-page">
      <h1>{results[0].location.address.line}</h1>
      <h2 className="sub-heading">{details.property_detail.prop_common.sqft} SF | ${details.property_detail.prop_common.price.toLocaleString('en-US')}  (${Math.floor(details.property_detail.prop_common.price / details.property_detail.prop_common.sqft)}/SF) | {details.property_detail.address.city}, {details.property_detail.address.state}</h2>
      { images.length > 1 && <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />}
      <p className="deets">{details.property_detail.prop_common.description}</p>
      <div className="property-deets">
        <div>
          <p>Bedrooms: <b>{details.property_detail.prop_common.bed}</b></p>
          <p>Bathrooms: <b>{details.property_detail.prop_common.bath}</b></p>
          <p>Buiding Height: <b>{details.property_detail.prop_common.stories} Story</b></p>
          <p>Price Per SF: <b>${Math.floor(details.property_detail.prop_common.price / details.property_detail.prop_common.sqft)}</b></p>
        </div>
        <div>
          <p>Property Type: <b>{details.property_detail.prop_common.type.charAt(0).toUpperCase() + details.property_detail.prop_common.type.slice(1).toLowerCase()}</b></p>
          <p>Year Built: <b>{details.property_detail.prop_common.year_built}</b></p>
          <p>Garage: <b>{details.property_detail.flags.is_garage_present ? 'Yes' : 'No' }</b></p>
          <p>Nearest Pinball: <b>2.38 miles</b></p>
        </div>
      </div>
      
      

      
    </div>
  );
}
