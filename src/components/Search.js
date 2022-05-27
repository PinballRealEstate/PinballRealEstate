import React from 'react';
import { useHistory } from 'react-router-dom';


export default function Search() {

  const { push } = useHistory();
  function handleButton(){
    push('/profile');
  }
  return (
    <div>Search
      <button onClick={handleButton}>Quick Lil Button</button>
    </div>
  );
}
