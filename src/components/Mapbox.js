import React, { useEffect, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox({ homes, initial_lat, initial_lon, detail }) {
  //state for map data and center of the map coordinates
  const [geojson, setgeoJson] = useState({
    type: 'FeatureCollection',
    features: []
  });
  const [centerCoordinates, setCenterCoordinates] = useState({ lat: initial_lat, lon: initial_lon });
  
  //styling for map data (green circles for each home displayed)
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 8,
      'circle-color': '#b7de9c'
    }
  };

  const defaultData = [{ 
    type: 'Feature', 
    geometry: { type: 'Point', 
      coordinates: [initial_lon, initial_lat] } 
  }];
  
  //use effect to update the map home data each time the homes array is updated
  useEffect(() => {
    //if no homes are returned then don't display any properties
      const data = homes.length > 0
        ? homes
            .filter(home =>  
              home.location.address.coordinate)
             // filter _then_ map makes the "return null" in your map callback unnecessary.
            .map(home =>  ({ 
                  type: 'Feature', 
                  geometry: { 
                    type: 'Point', 
                    coordinates: [
                      home.location.address.coordinate.lon, 
                      home.location.address.coordinate.lat
                    ] 
                  }
              })
            )
      : defaultData;

    //update the center of the map when homes update
    setgeoJson({ ...geojson, features: data });
    setCenterCoordinates({ lat: initial_lat, lon: initial_lon });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homes]);


  return (
    <div>
      {/* initialization of the map on the page */}
      <Map
        id="mymap"
        initialViewState={{
          longitude: centerCoordinates.lon,
          latitude: centerCoordinates.lat,
          zoom: detail ? 14 : 11
        }}
        style={{ width: detail ? '60vw' : '100vw', height: '300px' }}
        mapStyle="mapbox://styles/willgundy/cl3951tjg000014o8h75x3u7n"
        // probably makes sense to stroe this as a .env variable. And if it should be private, it needs to be hidden in an endpoint on the server side (react .env variables won't be enough).
        mapboxAccessToken={'pk.eyJ1Ijoid2lsbGd1bmR5IiwiYSI6ImNsMzNtd3RwZDAyaDAzYm0xa2F5bWRxd2UifQ.K6k7FavnWDdnUB_CVEIzzA'}
      >
        {/* source and data layer that displays homes */}
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
