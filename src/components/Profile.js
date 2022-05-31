import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, updateFilter, } from '../services/supabase-utils';
import CustomMenu from './CustomMenu';
import './Profile.css';
export default function Profile() {

  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    zip_code: 0,
    low_price: 0,
    high_price: 0,
  });
  useEffect(() => {
    async function getProfileOnLoad(){
      // const { id } = await getUser();
      const filterData = await getFilters();
      setFilters(filterData);      
    }
    return getProfileOnLoad;
  }, []);

  async function handleFilterChange(e){
    e.preventDefault();
    await updateFilter(filters);
    setVisible(false);
  }
  async function handleNameChange(e) {
    e.preventDefault();
    // await editUser(userNameData);
  }

  return (
    <div>
      <div className='profile'>
        <header>
          <CustomMenu/>
        </header>
        <img src='https://placedog.net/200'/>
        <h2>{profile.username}</h2>
        <button onClick={(() => setVisible(true))}>Change User Name?</button>
        <form>
          <label>
          Edit User Name
            <input onChange={e => setProfile.username(e.target.value)} />
            {/* <button onClick={handleNameChange}>Change Name</button> */}
          </label>
          
        </form>
        <div className='filters'>
          <div className='display_filters'>
            <p>Zip Code: {filters.zip_code}</p>
            <p>Low Price: {filters.low_price}</p>
            <p>High Price: {filters.high_price}</p><br/>
            <button onClick={(() => setVisible(true))}>Update Filters</button><br/>
            <br/>
          </div>
          <br/>
          <div className='filter_form'>
            <form onSubmit={handleFilterChange}>       
              { visible && 
            <label> 
              Zip Code 
              <input value={filters.zip_code} onChange={e => setFilters({ ...filters, zip_code: e.target.value })}></input>
              Low Price
              <input value={filters.low_price} onChange={e => setFilters({ ...filters, low_price: e.target.value })}></input>
              High Price
              <input value={filters.high_price} onChange={e => setFilters({ ...filters, high_price: e.target.value })}></input>
              <button onClick={handleFilterChange}>Update</button>
            </label>            
              }
            </form>
          </div>
        </div>
        
        <div className='cards'>Saved home cards here</div>
      </div>
    </div>
  );
}
