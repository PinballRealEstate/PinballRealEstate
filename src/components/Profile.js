import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, updateFilter, updateProfile, getFavoriteHomes, uploadAvatar } from '../services/supabase-utils';
import CustomMenu from './CustomMenu';
import PropertyCard from './PropertyCard';
import Carousel from 'tiny-slider-react/build/Carousel';
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState({
    username:'',
    id:0, 
    avatar:'',
  });
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleNameForm, setVisibleNameForm] = useState(false);
  const [filters, setFilters] = useState({
    zip_code: 0,
    low_price: 0,
    high_price: 0,
  });
  const [savedHomes, setSavedHomes] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1250 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1250, min: 950 },
      items: 3,
      slidesToSlide: 3,
    },
    smallTablet: {
      breakpoint: { max: 950, min: 650 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
  };
  
  async function getSavedHomes(){
    const savedHomesArray = await getFavoriteHomes();
    setSavedHomes(savedHomesArray);
  }
  async function getProfileOnLoad(){
    const { id } = await getUser();
    const profileData = await getProfileByID(id);
    const filterData = await getFilters();
    setProfile(profileData);
    setFilters({
      zip_code: filterData.zip_code,
      low_price: filterData.low_price,
      high_price: filterData.high_price,
      id: filterData.id
    }); 
  }
  async function getDataOnLoad(){
    await getSavedHomes();
    await getProfileOnLoad();
  }
  useEffect(() => {
    getDataOnLoad();
  }, []);

  async function handleFilterChange(e){
    e.preventDefault();
    await updateFilter(filters);
    setVisibleFilter(false);
  }
  
  function handleFilterVisible(){
    if (visibleFilter === false){
      setVisibleFilter(true);
    } else {
      setVisibleFilter(false);
    }
  }
  
  async function handleProfileChange(e) {
    e.preventDefault();
    await updateProfile(profile);
    handleUpload();
    setVisibleNameForm(false);
  }
  
  function handleEditNameVisible(){
    if (visibleNameForm === false){
      setVisibleNameForm(true);
    } else {
      setVisibleNameForm(false);
    }
  }
  async function handleUpload(){
    await uploadAvatar(profile.avatar);
    setVisibleNameForm(false);
  }

  
  return (
    <div className='profile-page'>
      <header>
        <CustomMenu/>
      </header>
      <div className='profile'>
        <div className='avatar-username'>
          <img src={profile.avatar}/>
          <h2>{profile.username}</h2>
        </div>
        <button className='profile-button' onClick={handleEditNameVisible}>Edit</button>
        <form className='name-form' onSubmit={handleProfileChange}>
          { visibleNameForm &&              
              <> 
                Upload Photo<br/>
                <input type='file' value={profile.avatar} onChange={e => setProfile({ ... profile, avatar: e.target.files })}></input><br/>
                Edit Username <br/>
                <input value={profile.username} onChange={e => setProfile({ ...profile, username: e.target.value })}></input><br/>
                <button onClick={handleProfileChange}>Submit</button><br/>
              </>
          }          
        </form>
        <div className='filters-div'>
          <div className='current-filters'>
            <label>Zip Code: {filters.zip_code}</label>
            <label>Low Price: ${filters.low_price.toLocaleString('en-US')}</label>
            <label>High Price: ${filters.high_price.toLocaleString('en-US')}</label>
            <button onClick={handleFilterVisible}>Filters</button><br/>
            <br/>
          </div>
          <br/>
          <div className='filter-form-container'>
            <form onSubmit={handleFilterChange}>       
              { visibleFilter && 
            <div className='filter-form'> 
              <label>
                Zip Code <br/>
                <input className='zip-code-input' value={filters.zip_code} onChange={e => setFilters({ ...filters, zip_code: e.target.value })}></input>
              </label>
              <label>
                Minimum Price <br/>
                <input className='min-price-input'value={filters.low_price} onChange={e => setFilters({ ...filters, low_price: e.target.value })}></input>
              </label>
              <label>
                High Price <br/>
                <input className='max-price-input'value={filters.high_price} onChange={e => setFilters({ ...filters, high_price: e.target.value })}></input>
              </label>
              <button onClick={handleFilterChange}>Update</button>
            </div>            
              }
            </form>
          </div>
        </div>
      </div>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        autoPlaySpeed={20000}>
        <div className='card-container'>
          {savedHomes.length > 0 &&
                //address, city, state, zip, bed, bath, sq ft, list price, property id, image
                savedHomes.map((savedHome, i) => <PropertyCard key={i} 
                  savedHomes={savedHomes}  
                  getSavedHomes={getSavedHomes}
                  address={savedHome.address}
                  secondary_address={savedHome.secondary_address}
                  bed={savedHome.bedrooms}
                  bath={savedHome.bathrooms}
                  sqft={savedHome.square_feet}
                  listprice={savedHome.list_price}
                  image={savedHome.primary_photo}
                  id={savedHome.property_id}>
                </PropertyCard>)
          }
        </div>
      </Carousel>
    </div>
  );
}
