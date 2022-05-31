import React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox() {
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
  return (
    <Map
      id="mymap"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 10
      }}
      style={{ width: '100vw', height: '300px' }}
      mapStyle="mapbox://styles/willgundy/cl3951tjg000014o8h75x3u7n"
      mapboxAccessToken={'pk.eyJ1Ijoid2lsbGd1bmR5IiwiYSI6ImNsMzNtd3RwZDAyaDAzYm0xa2F5bWRxd2UifQ.K6k7FavnWDdnUB_CVEIzzA'}
    >
    </Map>
  );
}
