import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { results } from '../data';
import PropertyCard from './PropertyCard.js';


export default function Search() {
  const [homes, setHomes] = useState([]);
  const { push } = useHistory();
  function handleButton(){
    setHomes(results);
  }
  return (
    <div>
      <button onClick={handleButton}>Add Home Cards</button>
      <div className='card-container'>
        {homes.map((home, i) => <PropertyCard key={i} home={home}> </PropertyCard>)}
      </div>
    </div>
  );
}
