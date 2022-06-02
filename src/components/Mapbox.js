import React, { useEffect, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox({ homes, initial_lat, initial_lon }) {
  const [geojson, setgeoJson] = useState({
    type: 'FeatureCollection',
    features: []
  });
  const [centerCoordinates, setCenterCoordinates] = useState({ lat: initial_lat, lon: initial_lon });
    
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
  
  useEffect(() => {
    let data = [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } },
    ];
    if (homes.length > 0) {
      data = homes.map(home => { 
        if (home.location.address.coordinate) {
          return { 
            type: 'Feature', 
            geometry: { type: 'Point', 
              coordinates: [home.location.address.coordinate.lon, home.location.address.coordinate.lat] } 
          };
        } else {
          return null;
        }
      }).filter(i => i);
    } else {
      data = [{ 
        type: 'Feature', 
        geometry: { type: 'Point', 
          coordinates: [initial_lon, initial_lat] } 
      }];
    }
    setgeoJson({ ...geojson, features: data });
    setCenterCoordinates({ lat: initial_lat, lon: initial_lon });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homes]);


  return (
    <div>
      {<Map
        id="mymap"
        initialViewState={{
          longitude: centerCoordinates.lon,
          latitude: centerCoordinates.lat,
          zoom: 10
        }}
        style={{ width: '70vw', height: '300px' }}
        mapStyle="mapbox://styles/willgundy/cl3951tjg000014o8h75x3u7n"
        mapboxAccessToken={'pk.eyJ1Ijoid2lsbGd1bmR5IiwiYSI6ImNsMzNtd3RwZDAyaDAzYm0xa2F5bWRxd2UifQ.K6k7FavnWDdnUB_CVEIzzA'}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>}
    </div>
  );
}
