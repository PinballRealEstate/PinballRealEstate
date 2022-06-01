import React, { useEffect, useState } from 'react';
import CustomSlider from './CustomSlider';
import Mapbox from './Mapbox';
import PropertyCard from './PropertyCard.js';
import './SignIn.css';
import { getFavoriteHomes, getFilters, updateFilter } from '../services/supabase-utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { geoCode, getAllHomes } from '../services/fetch-utils';

export default function Search() {
  const [userPrefs, setUserPrefs] = useState({});
  const [zipCodeData, setZipCodeData] = useState({
    lat: 0,
    lon: 0,
    city: '',
    state_code: ''
  });
  const [zipCodeInForm, setZipCodeInForm] = useState(userPrefs.zip_code);
  const [homes, setHomes] = useState([]);
  const [savedHomes, setSavedHomes] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1250 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1250, min: 950 },
      items: 3,
      slidesToSlide: 3,
    },
    smallTablet: {
      breakpoint: { max: 950, min: 650 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
  };

  async function getSavedHomes() {
    const savedHomeArray = await getFavoriteHomes();
    setSavedHomes(savedHomeArray);
  }

  async function mapZipCode() {
    const { data } = await geoCode(userPrefs.zip_code);
    setZipCodeData({
      lat: data.features[0].center[1],
      lon: data.features[0].center[0],
      city: data.features[0].context[0].text,
      state_code: data.features[0].context[2].short_code.slice(-2)
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    setUserPrefs({
      ...userPrefs, zip_code: zipCodeInForm
    });
    if (userPrefs.zip_code > 0) {
      mapZipCode();
    }
    await updateFilter(userPrefs);
  }

  
  async function getHomeData(){
    const data = await getAllHomes(userPrefs.zip_code, zipCodeData.city, zipCodeData.state_code);
    if (data) {
      setHomes(data.home_search.results);
    }
  }

  //on load of the page get user preferences and saved homes
  useEffect(() => {
    getInfoOnLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInfoOnLoad() {
    async function getUserPrefs(){
      const filterResponse = await getFilters();
      setUserPrefs({
        zip_code: filterResponse.zip_code,
        low_price: filterResponse.low_price,
        high_price: filterResponse.high_price,
        id: filterResponse.id
      });
    }
    await getUserPrefs();
    await getSavedHomes();
  }

  useEffect(() => {
    getHomeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPrefs]);

  return (
    <div className='searchPage'>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <label>Zip Code  <input value={zipCodeInForm} onChange={e => setZipCodeInForm(e.target.value)}></input></label>
          <label>List Price  <CustomSlider low_price={userPrefs.low_price} high_price={userPrefs.high_price} /></label>
          <button>Search</button>
        </form>
      </div>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        autoPlaySpeed={20000}>
        {homes.map((home, i) => <PropertyCard key={i} 
          address={home.location.address.line}
          secondary_address={`${home.location.address.city}, ${home.location.address.state} ${home.location.address.postal_code}`}
          bed={home.description.beds}
          bath={home.description.baths}
          sqft={home.description.sqft}
          listprice={home.list_price}
          image={home.primary_photo.href}
          id={home.property_id}
          savedHomes={savedHomes} getSavedHomes={getSavedHomes}> </PropertyCard>)}
      </Carousel>
      {homes.length > 0 && <Mapbox homes={homes} zipCodeData={zipCodeData}/>}
    </div>
  );
}
