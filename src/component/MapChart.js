import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import axios from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart() {
  const [guessLocation, setGuessLocation] = useState(null);
  const [place, setPlace] = useState(null);

  function getDistanceFromCoords(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371; // km

    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }

  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  async function getNameFromCoords([lat, lng]) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en,`;
    const response = await axios.get(url);

    if (response.data.length === 0) {
      throw new Error("No results found");
    }

    return response.data;
  }

  const handleClick = (geo) => () => {
    const randomIndex = Math.floor(
      Math.random() * geo.geometry.coordinates[0].length
    );

    console.log(geo);

    console.log(randomIndex, "randomIndex");
    setGuessLocation(geo.geometry.coordinates[0][randomIndex]);
    console.log(guessLocation);
    const place = getNameFromCoords(guessLocation);
    place.then((val) => setPlace(val));
    //   setPlace(place);
    console.log("place", place);
    // Find distance
    const distance = getDistanceFromCoords(
      guessLocation[0],
      guessLocation[1],
      40.7128,
      -74.006
    );
    console.log(distance); // Output: 4134.651220721203 km
  };

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={handleClick(geo)}
            />
          ))
        }
      </Geographies>
      {guessLocation && (
        <Marker coordinates={guessLocation}>
          <circle r={8} fill="#F53" />
        </Marker>
      )}
      {place && (
        <Marker coordinates={guessLocation} fill="#777">
          <text textAnchor="middle" fill="#F53">
            {place?.countryName}
          </text>
        </Marker>
      )}
    </ComposableMap>
  );
}
