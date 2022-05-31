import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, } from '../services/supabase-utils';
import CustomMenu from './CustomMenu';
export default function Profile() {

  const [profile, setProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState();
  useEffect(() => {
    async function getProfileOnLoad(){
      const { id } = await getUser();
      const profileData = await getProfileByID(id);
      const filterData = await getFilters(id);
      setProfile(profileData);
      setFilters(filterData);      
    }
    return getProfileOnLoad;
  }, []);

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
        <div className='filters'>Filters go here</div>
        <div className='cards'>Saved home cards here</div>
      </form>
    </div>
  );
}
