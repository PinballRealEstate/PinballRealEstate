import React, { useEffect, useState } from 'react';
import { results } from '../data';
import CustomSlider from './CustomSlider';
import Mapbox from './Mapbox';
import PropertyCard from './PropertyCard.js';
import './SignIn.css';
import { getFavoriteHomes, getFilters, updateFilter } from '../services/supabase-utils';

export default function Search() {
  const [userPrefs, setUserPrefs] = useState({
    zip_code: 0,
    low_price: 0,
    high_price: 0,
    id: 0
  });
  const [homes, setHomes] = useState([]);
  const [savedHomes, setSavedHomes] = useState([]);

  async function getSavedHomes() {
    const savedHomeArray = await getFavoriteHomes();
    setSavedHomes(savedHomeArray);
  }

  async function handleSubmit(e){
    e.preventDefault();
    setHomes(results);
    await updateFilter(userPrefs);
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
          <label>List Price  <CustomSlider low_price={userPrefs.low_price} high_price={userPrefs.high_price} /></label>
          <button onClick={handleSubmit}>Search</button>
        </form>
      </div>
      
      <div className='card-container'>
        {homes.map((home, i) => <PropertyCard key={i} home={home} savedHomes={savedHomes} getSavedHomes={getSavedHomes}> </PropertyCard>)}
      </div>
      {/* <Mapbox/> */}
      <div>
       
      </div>
    </div>
  );
}
