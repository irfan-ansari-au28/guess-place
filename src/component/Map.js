import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const MapC = () => {
  const [place, setPlace] = useState(null);
  // handle click on Map
  const handleClick = (geo) => () => {
    // Set place
    setPlace(geo.properties.geounit);
    console.log("geoUnit", place);
    // const randomIndex = Math.floor(
    //   Math.random() * geo.geometry.coordinates[0].length
    // );

    console.log(geo);

    // console.log(randomIndex, "randomIndex");
    // setGuessLocation(geo.geometry.coordinates[0][randomIndex]);
    // console.log(guessLocation);
    // const place = getNameFromCoords(guessLocation);
    // place.then((val) => setPlace(val));
    // //   setPlace(place);
    // console.log("place", place);
    // Find distance
    // const distance = getDistanceFromCoords(
    //   guessLocation[0],
    //   guessLocation[1],
    //   40.7128,
    //   -74.006
    // );
    // console.log(distance); // Output: 4134.651220721203 km
  };
  return (
    <ComposableMap
      width={800}
      height={800}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -53.0, 0],
        scale: 1200,
      }}
    >
      <Graticule stroke="#EAEAEC" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#9998A3"
              stroke="#EAEAEC"
              onClick={handleClick(geo)}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapC;
