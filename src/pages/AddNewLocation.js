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
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { FormControl, Input, InputLabel } from "@mui/material";
import "./Map.css";

export default function AddNewLocation() {
  // const google = window.google;
  const [activeInfoWindow, setActiveInfoWindow] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);
  const [locale, setLocale] = useState([]);
  const [addLocation, setAddLocation] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addDescription, setAddDescription] = useState("");
  const [addTittle, setAddTittle] = useState("");
  const [username, setUsername] = useState("");
  const [newCenter, setNewCenter] = useState(false);
  const [value, setValue] = useState("");
  const [newPlace, setNewPlace] = useState(null);
  const [addSearch, setAddSearch] = useState(false);
  const center = { lat: lat, lng: lng };
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [clickSomewhere, setClickSomewhere] = useState(false);

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
      setAddSearch(true);
      setUsername(decodedToken?.name);
      setNewLat(result.lat);
      setNewLng(result.lng);
    } catch (error) {
      console.error("Error retrieving places", error);
    }
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

  const containerStyle = {
    width: "90%",
    height: "450px",
  };

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
    setAddLocation(true);
    setNewLat(lat);
    setNewLng(lng);
    setUsername(decodedToken?.name);
    setClickSomewhere(true);
  };
  console.log(
    `get or not? lat: ${newLat} lng: ${newLng} addLocation: ${addLocation}`
  );

  console.log(`token: ${token}`);
  console.log(`username : ${decodedToken?._id}`);

  // add new location handler
  const handleAdding = async (e) => {
    e.preventDefault();
    let newPost = {
      title: addTittle,
      lat: newLat,
      lng: newLng,
      creator: decodedToken?.name,
      description: addDescription,
      user_id: decodedToken?._id,
    };
    try {
      const res = await fetch("https://water4all-backend.onrender.com/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      setAddLocation(false);
      setIsAdded(true);
      setAddTittle(null);
      setAddTittle(null);
    } catch (err) {
      console.log(err);
    }
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };

  // ***NEED IT LATER*****
  // const markerDragEnd = (event, index) => {
  //     console.log(event.latLng.lat())
  //     console.log(event.latLng.lng())
  // }

  return (
    <>
      <h2>ADD NEW LOCATION</h2>
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
            {newCenter && !clickSomewhere && (
              <Marker onClick={markerClicked} position={newPlace} />
            )}
            {addLocation && (
              <Marker
                onClick={markerClicked}
                position={{ lat: newLat, lng: newLng }}
              />
            )}
            {addLocation ? (
              <FormControl>
                <button onClick={() => setAddLocation(false)}>Close</button>
                <InputLabel>Tittle: </InputLabel>
                <Input
                  value={addTittle}
                  onChange={(e) => setAddTittle(e.target.value)}
                />
                <InputLabel>Your Name:</InputLabel>
                <Input disabled="true" value={username} />
                <InputLabel>Location: </InputLabel>
                <Input disabled="true" value={newLat} />
                <Input disabled="true" value={newLng} />
                <InputLabel>Description: </InputLabel>
                <Input
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                />
                <button disabled={!token && !addTittle} onClick={handleAdding}>
                  Add Water Point
                </button>
              </FormControl>
            ) : null}
            {addSearch && !clickSomewhere && (
              <FormControl>
                <button onClick={() => setAddSearch(false)}>Close</button>
                <InputLabel>Tittle: </InputLabel>
                <Input
                  value={addTittle}
                  onChange={(e) => setAddTittle(e.target.value)}
                />
                <InputLabel>Your Name:</InputLabel>
                <Input disabled="true" value={username} />
                <InputLabel>Location: </InputLabel>
                <Input disabled="true" value={newLat} />
                <Input disabled="true" value={newLng} />
                <InputLabel>Description: </InputLabel>
                <Input
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                />
                <button disabled={!token} onClick={handleAdding}>
                  Add Water Point
                </button>
              </FormControl>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
