import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { AddLocation } from "@mui/icons-material";
import "./Map.css";

//
import AddNewLocationModal from "../components/AddNewLocationModal";
import IconButton from "@mui/material/IconButton";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
//

export default function MapPage() {
  // const google = window.google;
  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locale, setLocale] = useState([]);
  const center = { lat: lat, lng: lng };
  const [newCenter, setNewCenter] = useState(false);
  const [value, setValue] = useState("");
  const [newPlace, setNewPlace] = useState(null);
  const { token } = useContext(AuthContext);
  const [clickSomewhere, setClickSomewhere] = useState(false);
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);

  // google search bar
  const searchBoxRef = useRef(null);
  const onLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = async () => {
    try {
      const places = await searchBoxRef.current?.getPlaces();
      console.log(places);
      const result = getLatLng(places[0]);
      console.log(result);
      setClickSomewhere(false);
      setNewCenter(true);
      setNewPlace(result);
      setValue("");
    } catch (error) {
      console.error("Error retrieving places", error);
    }
  };

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  // get user current location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }

  // get exist water point
  const getNewLocation = async () => {
    try {
      const res = await fetch("https://water4all-backend.onrender.com/posts");
      const data = await res.json();
      setLocale(data.data);
      console.log(locale);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNewLocation();
  }, []);

  // get acurate address
  const getAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(lat, lng);
    const request = {
      latLng: latlng,
    };
    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (results) => {
        results?.length ? resolve(results[0].formatted_address) : reject(null);
      });
    });
  };
  // get click location
  const mapClicked = async (event) => {
    console.log(event.latLng.lat(), event.latLng.lng());
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const address = await getAddress(event.latLng.lat(), event.latLng.lng());
    console.log(address);
    setNewLat(lat);
    setNewLng(lng);
    setClickSomewhere(true);
  };
  console.log(`get or not? lat: ${newLat} lng: ${newLng} `);

  // search water location

  const containerStyle = {
    width: "90%",
    height: "450px",
  };

  // const mapClicked = (event) => {
  //     console.log(event.latLng.lat(), event.latLng.lng());
  //     setClickSomewhere(true);
  //     setClickLocation(true);
  // }
  // ***NEED IT LATER*****
  // const markerClicked = (marker, index) => {
  //     setActiveInfoWindow(index)
  //     console.log(marker, index)
  // }

  // const markerDragEnd = (event, index) => {
  //     console.log(event.latLng.lat())
  //     console.log(event.latLng.lng())
  // }

  return (
    <div>
      <h2>WATER FINDER</h2>
      <div className="mapcontainer">
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={newCenter ? newPlace : center}
            zoom={15}
            onClick={mapClicked}
            options={{
              mapTypeControl: false,
              streetView: false,
            }}
          >
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type="text"
                placeholder="Search Here"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                }}
              />
            </StandaloneSearchBox>
            <Marker style={{ width: "50px" }} position={center} />
            {locale?.map((lo) => (
              <Marker key={lo._id} position={{ lat: lo.lat, lng: lo.lng }} />
            ))}
            {newCenter && !clickSomewhere && <Marker position={newPlace} />}
            {clickSomewhere && (
              <Marker position={{ lat: newLat, lng: newLng }} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      {token !== null && (
        <>
          <Link
            to="/addnewlocation"
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "6px 16px",
            }}
          >
            Click here to add new location
            <IconButton aria-label="add">
              <AddLocationAltRoundedIcon />
            </IconButton>
          </Link>
        </>
      )}
      {token === null && (
        <div>
          <AddNewLocationModal />
        </div>
      )}
    </div>
  );
}
