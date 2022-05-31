import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, updateFilter, } from '../services/supabase-utils';
import CustomMenu from './CustomMenu';
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
      console.log('filterData', filterData);     
    }
    return getProfileOnLoad;
  }, []);

  async function handleFilterChange(e){
    e.preventDefault();
    await updateFilter(filters);
  }
  async function handleNameChange(e) {
    e.preventDefault();
    // await editUser(userNameData);
  }

  return (
    <div>
      <header >
        <CustomMenu/>
      </header>
      <img src='https://placedog.net/200'/>
      <h2>{profile.username}</h2>
      <button onClick={(() => setVisible(true))}>Change User Name?</button>
      <form>
        { visible && <label>
          Edit User Name
          <input onChange={e => setProfile.username(e.target.value)} />
          <button onClick={handleNameChange}>Change Name</button>
        </label>
        }
        <div className='filters'>
          Zip Code: {filters.zip_code}<br/>
          Low Price: {filters.low_price}<br/>
          High Price: {filters.high_price}<br/>
        </div>
        <div className='cards'>Saved home cards here</div>
      </form>
    </div>
  );
}
