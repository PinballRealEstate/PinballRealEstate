import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, } from '../services/supabase-utils';

export default function Profile() {

  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState();
  useEffect(() => {
    async function getProfileOnLoad(){
      const { id } = await getUser();
      const profileData = await getProfileByID(id);
      const filterData = await getFilters();
      setProfile(profileData);
      setFilters(filterData);
      
    }
    console.log('filters', filters);
    return getProfileOnLoad;
  }, []);
  
  console.log('profile', profile);
  async function handleNameChange(e) {
    e.preventDefault();
    // await editUserName(userNameData);
  }

  return (
    <div>
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
        <div className='filters'>Filters go here</div>
        <div className='cards'>Saved home cards here</div>
      </form>
    </div>
  );
}
