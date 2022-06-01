import React, { useEffect, useState } from 'react';
import { results } from '../data';
import CustomSlider from './CustomSlider';
import Mapbox from './Mapbox';
import PropertyCard from './PropertyCard.js';
import './SignIn.css';
import { getFavoriteHomes, getFilters, updateFilter } from '../services/supabase-utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Search() {
  const [userPrefs, setUserPrefs] = useState({
    zip_code: 0,
    low_price: 0,
    high_price: 0,
    id: 0
  });
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

  async function handleSubmit(e){
    e.preventDefault();
    setHomes(results);
    await updateFilter(userPrefs);
  }

  function setSignUpData(){
    console.log('hello?');
  }

  useEffect(() => {
    async function getUserPrefs(){
      const filterResponse = await getFilters();
      setUserPrefs({
        zip_code: filterResponse.zip_code,
        low_price: filterResponse.low_price,
        high_price: filterResponse.high_price,
        id: filterResponse.id
      });
    }
    getUserPrefs();
    getSavedHomes();
  }, []);

  return (
    <div className='searchPage'>
      <div className="search">
        <form>
          <label>Zip Code  <input value={userPrefs.zip_code} onChange={e => setUserPrefs({ ...userPrefs, zip_code: e.target.value })}></input></label>
          <label>List Price  <CustomSlider signUpData={{}} setSignUpData={setSignUpData}/></label>
          <button onClick={handleSubmit}>Search</button>
        </form>
      </div>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        autoPlaySpeed={20000}>
        {homes.map((home, i) => <PropertyCard key={i} home={home} savedHomes={savedHomes} getSavedHomes={getSavedHomes}> </PropertyCard>)}
      </Carousel>
      {userPrefs.zip_code && <Mapbox homes={homes} zip_code={userPrefs.zip_code}/>}
      <div>
       
      </div>
    </div>
  );
}
