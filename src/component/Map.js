import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const MapC = () => {
  const [place, setPlace] = useState(null);
  const [coOrds, setCoOrds] = useState(null);
  // let randomIdx;

  // handle click on Map
  const handleClick = (geo) => () => {
    // Set place
    setPlace(geo.properties.geounit);
    // Set coOrdinates on Click
    setCoOrds(geo.geometry.coordinates[0]);
    console.log("geoUnit", place);
    console.log(geo);

    // if (coOrds[1] || coOrds[0]) {
    //   randomIdx = Math.floor(Math.random() * (coOrds[1] || coOrds[0].length));
    // }
    // console.log("idx", randomIdx);
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
      {coOrds && (
        <Marker coordinates={coOrds[0]}>
          <circle r={8} fill="#F53" />
        </Marker>
      )}
    </ComposableMap>
  );
};

export default MapC;
