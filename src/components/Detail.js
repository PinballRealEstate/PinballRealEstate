import React, { useState, useEffect } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import './Detail.css';
import { useParams } from 'react-router-dom';
import { getSingleHome } from '../services/fetch-utils';
import Mapbox from './Mapbox';

import Spinner from './Spinner';
import DetailCard from './DetailCard';
import DetailBarChart from './DetailBarChart';


export default function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  //use effect to get property data based on the passed in property id from the url parameters
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const { property_detail } = await getSingleHome(id);
      setDetails(property_detail);
      const imageArray = property_detail.photos.map((photo) => { return { 'url': photo.href };});
      setImages(imageArray);
      setIsLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="detail-page">
      {isLoading ? <Spinner /> :
        <>{ details &&
          <div className='card-details'>
            <div className="address-area">
              <h1 className="street-address">{details.address.line}</h1>
              <h2 className="sub-heading">{details.prop_common.sqft} SF | ${details.prop_common.price.toLocaleString('en-US')}  (${Math.floor(details.prop_common.price / details.prop_common.sqft)}/SF) | {details.address.city}, {details.address.state}</h2>
            </div>
            { images.length > 1 && <SimpleImageSlider
              width={'60vw'}
              height={'40vw'}
              images={images}
              showBullets={true}
              showNavs={true}
              className={'image-carousel'}
            />}
            <p className="deets">{details.prop_common.description}</p>
            <div className="property-deets">
              {/* this is getting a big cluttered. Maybe a <DetailColumn {...details} /> component would clean it up ?*/}
              <div className="deets-column">
                <h2>Details:</h2>
                <p>Bedrooms: <b>{details.prop_common.bed}</b></p>
                <p>Bathrooms: <b>{details.prop_common.bath}</b></p>
                <p>Buiding Height: <b>{details.prop_common.stories} Story</b></p>
                <p>Price Per SF: <b>${Math.floor(details.prop_common.price / details.prop_common.sqft)}</b></p>
                <p>Property Type: <b>{details.prop_common.type.charAt(0).toUpperCase() + details.prop_common.type.slice(1).toLowerCase().replaceAll('_', ' ')}</b></p>
                <p>Year Built: <b>{details.prop_common.year_built}</b></p>
                <p>Garage: <b>{details.flags.is_garage_present ? 'Yes' : 'No' }</b></p>
                <p>Year Built: <b>{details.prop_common.year_built}</b></p>
              </div>
              <div className="deets-column">
                <h2>GreatSchools Ratings:</h2>
                {details.schools.map(school => <div className="school-item-wrapper" key={school.name}>
                  {school.ratings.great_schools_rating ?
                    <p className="school-grade"><b className="school-value">{school.ratings.great_schools_rating}</b>/10</p>
                    : <p className="school-grade"><b className="school-value">N/A</b></p>}
                  <div className="school-item" ><p><b>{school.name}</b></p><p>Grades:<b>{school.grades.range.low}-{school.grades.range.high}</b>   Distance:<b>{school.distance_in_miles}</b></p></div></div>)}
              </div>
              <div className="deets-column" >
                <h2>Listing History:</h2>
                <div className="row-class2"><p><b>Date</b></p><p><b>Price</b></p><p><b>Event</b></p></div>
                { 
                details.property_history.map(history => 
                  // HTML one-liners can be really challenging to maintain
                  <div className="row-class" key={history.source}>
                    <p><b>{history.date}</b></p>
                    <p>$ {history.price.toLocaleString('en-US')}</p>
                    <p>{history.event_name}</p>
                  </div>)}
              </div>
            </div>
            <Mapbox homes={[]} initial_lat={details.address.location.lat} initial_lon={details.address.location.lon} detail={true}/>
            <div className="market-trends">
              <h2>Market Trends</h2>
              <div className='flex-row space-around'>
                <DetailCard text={'Average Days on Market'} value={`${details.trend.median.age_days} days`}/>
                <DetailCard text={'Price per Sq Ft'} value={`$${details.trend.median.listing_price_sqft.toLocaleString('en-US')}`}/>
                <DetailCard text={'Average Sale Price'} value={`$${details.trend.median.closing_price.toLocaleString('en-US')}`}/>
              </div>
              <DetailBarChart chartData={details.trend.median.by_prop_type}/>
            </div>
          </div>}
        </>}
    </div>
  );
}
