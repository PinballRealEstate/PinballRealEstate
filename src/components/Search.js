import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { results } from '../data';
import CustomSlider from './CustomSlider';
import Mapbox from './Mapbox';
import PropertyCard from './PropertyCard.js';
import Image from '../generic-home2.jpg';

export default function Search() {
  const [homes, setHomes] = useState([]);
  const { push } = useHistory();
  function handleButton(){
    setHomes(results);
  }
  return (
    <div>
      <div>
        <img src={Image} />
        <form>
          <input></input>
          <CustomSlider/>
          <button onClick={handleButton}>Search</button>
        </form>
      </div>
      <div className='card-container'>
        {homes.map((home, i) => <PropertyCard key={i} home={home}> </PropertyCard>)}
      </div>
      <Mapbox/>
    </div>
  );
}
