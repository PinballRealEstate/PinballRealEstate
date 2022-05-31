import React, { useState, useEffect } from 'react';
import { results } from '../data';

export default function Detail() {

  const [details, setDetails] = useState({});
  

  useEffect(() => {
    async function load() {
     
      //setDetails(results[0]);
      const aSingleHouse = results[0];
    }
    load();
    console.log(results[0]);
    console.log(details);
  }, []); 

  return (
    <div>
      {results[0].photos.map((photo) => <img key={photo.href} src={photo.href}/>) }
      {}
      {/* <img src={results[0].photos[1].href}/> */}
      <p>{results[0].location.address.line}</p>
      <p>{results[0].location.address.city}, {results[0].location.address.state}</p>
      
    </div>
  );
}
