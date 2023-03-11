import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";
import { getDistanceFromCoords } from "./utils/getDistFromCoOrds";

const cities = [
  {
    name: "Amsterdam",
    position: {
      lat: 52.370216,
      lng: 4.895168,
    },
  },
  {
    name: "Rome",
    position: {
      lat: 41.902783,
      lng: 12.496366,
    },
  },
  {
    name: "Helsenki",
    position: {
      lat: 60.169856,
      lng: 24.938379,
    },
  },
  {
    name: "Stockholm",
    position: {
      lat: 59.329323,
      lng: 18.068581,
    },
  },
  {
    name: "London",
    position: {
      lat: 51.507351,
      lng: -0.127758,
    },
  },
  {
    name: "Oslo",
    position: {
      lat: 59.913869,
      lng: 10.752245,
    },
  },
  {
    name: "Paris",
    position: {
      lat: 48.856614,
      lng: 2.352222,
    },
  },
  {
    name: "Wien",
    position: {
      lat: 48.208174,
      lng: 16.373819,
    },
  },
  {
    name: "Budapest",
    position: {
      lat: 47.497912,
      lng: 19.040235,
    },
  },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const MapC = () => {
  const [place, setPlace] = useState(null);
  const [coOrds, setCoOrds] = useState([[[11.08, 47.39]]]);
  const [score, setScore] = useState(15000);
  const [dist, setDist] = useState(0);
  // let randomIdx;

  // handle click on Map
  const handleClick = (geo) => () => {
    // Set place
    setPlace(geo.properties.geounit);
    // Set coOrdinates on Click
    setCoOrds(geo.geometry.coordinates[0]);
    console.log("geoUnit", place);
    // console.log(geo);

    // if (coOrds[1] || coOrds[0]) {
    //   randomIdx = Math.floor(Math.random() * (coOrds[1] || coOrds[0].length));
    // }
    // console.log("idx", randomIdx);
    // Get Distance
    console.log(coOrds);
    const dist = getDistanceFromCoords(
      coOrds[0][0],
      coOrds[0][1],
      -7.24,
      55.06
    );
    // set Distance
    setDist(dist);
    console.log("dist", dist);

    if (dist < 250) {
      alert("found");
    }
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
      {
        <Marker coordinates={[-16.01, 67.53]}>
          <text textAnchor="middle" fill="blue">
            {`Score : ${score}`}
          </text>
        </Marker>
      }
    </ComposableMap>
  );
};

export default MapC;
