import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID } from '../services/supabase-utils';

export default function Profile() {

  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getProfileOnLoad(){
      const { id } = await getUser();
      console.log(id);
      const profileData = await getProfileByID(id);
    }
  }, []);



  return (
    <div>
      <p>profile</p>
    </div>
  );
}
