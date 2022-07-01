import React, { useEffect, useState } from 'react';
import CustomSlider from './CustomSlider';
import Mapbox from './Mapbox';
import PropertyCard from './PropertyCard.js';
import './SignIn.css';
import { getFavoriteHomes, getFilters, updateFilter } from '../services/supabase-utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { geoCode, getAllHomes } from '../services/fetch-utils';
import Spinner from './Spinner';

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPrefs, setUserPrefs] = useState({});
  const [priceRange, setPriceRange] = useState({
    low_price: userPrefs.low_price,
    high_price: userPrefs.high_price
  });
  const [zipCodeData, setZipCodeData] = useState({
    lat: 0,
    lon: 0,
    city: '',
    state_code: ''
  });
  const [zipCodeInForm, setZipCodeInForm] = useState(0);
  const [homes, setHomes] = useState([]);
  const [savedHomes, setSavedHomes] = useState([]);
  // makes the carousel responsive to different screen sizes
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 9,
      slidesToSlide: 9,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1850 },
      items: 5,
      slidesToSlide: 5,
    },
    midDesktop: {
      breakpoint: { max: 1850, min: 1250 },
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


  //function get saved homes by the user so that previously saved homes show differently than non saved
  async function getSavedHomes() {
    const savedHomeArray = await getFavoriteHomes();
    setSavedHomes(savedHomeArray);
  }

  //take the zip code value and geoCode for the map and to get the city and state to pass into the call
  async function mapZipCode() {
    const { data } = await geoCode(userPrefs.zip_code);
    setZipCodeData({
      lat: data.features[0].center[1],
      lon: data.features[0].center[0],
      city: data.features[0].context[0].text,
      state_code: data.features[0].context[2].short_code.slice(-2)
    });
  }

  //handle the submit of the filter form and update the users preferences
  //this also triggers the useEffect that looks up new homes
  async function handleSubmit(e){
    e.preventDefault();
    setUserPrefs({
      ...userPrefs, zip_code: Number(zipCodeInForm), high_price: priceRange.high_price, low_price: priceRange.low_price
    });
    if (userPrefs.zip_code > 0) {
      mapZipCode();
    }
    await updateFilter(userPrefs);
  }
  
  //on load of the page get user preferences and saved homes
  useEffect(() => {
    getInfoOnLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function to grab the user preferences and saved homes on load of the page
  async function getInfoOnLoad() {
    async function getUserPrefs(){
      const filterResponse = await getFilters();
      setUserPrefs({
        zip_code: filterResponse.zip_code,
        low_price: filterResponse.low_price,
        high_price: filterResponse.high_price,
        id: filterResponse.id
      });
    }
    await getUserPrefs();
    await getSavedHomes();
  }

  //get home information anytime userPreference information is changed
  useEffect(() => {
    getHomeData();

    setZipCodeInForm(userPrefs.zip_code);

    if (userPrefs.zip_code > 0) {
      mapZipCode();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPrefs]);

  //function to get home data based on user passed in preferences
  async function getHomeData(){
    setIsLoading(true);
    const data = await getAllHomes(userPrefs.zip_code, zipCodeData.city, zipCodeData.state_code, userPrefs.high_price, userPrefs.low_price);
    if (data.home_search) {
      setHomes(data.home_search.results);
    }
    setIsLoading(false);
  }

  return (
    <div className='searchPage'>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <label>Zip Code  <input required type='number' min='00000' max='99999' value={zipCodeInForm} onChange={e => setZipCodeInForm(e.target.value)}></input></label>
          <label className='flex-row'>List Price  <CustomSlider setPriceRange={setPriceRange} priceRange={priceRange} low_price={userPrefs.low_price} high_price={userPrefs.high_price} /></label>
          <button>Search</button>
        </form>
      </div>
      {/* added turnary in case homes state is empty */}
      {homes.length > 0 ? 
      // i would prefer the "sorry" div be written first. Once JSX gets so far from the ternery's initial condition, it's hard to read, especially if we end up in a nested ternerty. Alternatively, break the next div into its own component
        <div>
          {isLoading ? <Spinner /> :
            <div>
              <Carousel
                responsive={responsive}
                autoPlay={false}
                autoPlaySpeed={20000}>
                {homes.map((home, i) => <PropertyCard key={i} 
                  address={home.location.address.line}
                  secondary_address={`${home.location.address.city}, ${home.location.address.state} ${home.location.address.postal_code}`}
                  bed={home.description.beds}
                  bath={home.description.baths}
                  sqft={home.description.sqft}
                  listprice={home.list_price}
                  image={home.primary_photo.href}
                  id={home.property_id}
                  savedHomes={savedHomes} getSavedHomes={getSavedHomes}> </PropertyCard>)}
              </Carousel>
              {homes.length > 0 && 
        <Mapbox 
          homes={homes} 
          initial_lat={zipCodeData.lat} 
          initial_lon={zipCodeData.lon}
          detail={false}/>}
            </div>
          }
        </div> 
        // weird turnery to make sure spinner comes up on page load and no homes comes up when there are no homes
        : <div className='sorry'>{isLoading && homes.length === 0 ? <Spinner /> : <h1>Oh No! No Homes Found. Try Again</h1>}</div>}
      
    </div>
  );
}
