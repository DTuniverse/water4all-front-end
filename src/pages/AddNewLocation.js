import React, { useState, useEffect, useRef, useContext } from "react";
import {  GoogleMap, InfoWindow, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { Button, FormControl, TextField, Box, Input } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./Map.css";

export default function AddNewLocation() {
  // const google = window.google;
  const [activeInfoWindow, setActiveInfoWindow] = useState(false);
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);
  const [locale, setLocale] = useState([]);
  const [addLocation, setAddLocation] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addDescription, setAddDescription] = useState(null);
  const [addTittle, setAddTittle] = useState(null);
  const [username, setUsername] = useState("");
  const [newCenter, setNewCenter] = useState(false);
  const [value, setValue] = useState("");
  const [newPlace, setNewPlace] = useState(null);
  const [addSearch, setAddSearch] = useState(false);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [clickSomewhere, setClickSomewhere] = useState(false);
  const { lat, lng } = useContext(AuthContext);
  const center = { lat: lat, lng: lng };
  const defaultCenter = { lat: 52.519432315072166, lng: 13.401147636877893 };

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


  // get exist water point
  const getNewLocation = async () => {
    console.log("get new location running")
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
  }, [isAdded]);

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
    console.log("MAP CLICKED", lat, lng )
    const address = await getAddress(event.latLng.lat(), event.latLng.lng());
    console.log(address);
    setAddLocation(true);
    setIsAdded(false);
    setNewLat(lat);
    setNewLng(lng);
    setUsername(decodedToken?.name);
    setClickSomewhere(true);
  };
  console.log(
    `get or not? lat: ${newLat} lng: ${newLng} addLocation: ${addLocation}`, typeof(newLat)
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
      console.log(`res: ${res.ok}`);
      setAddLocation(false);
      setAddSearch(false);
      setIsAdded(true);
      setAddTittle(null);
      setAddDescription(null);
    } catch (err) {
      console.log(err);
    }
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };

  const markerDragEnd = (event, index) => {
      console.log(event.latLng.lat())
      console.log(event.latLng.lng())
  }
  // console.log(`description: ${addDescription}`)
  // console.log("NEWCENTER ", newCenter )
  // console.log("NEWPLACE ", newPlace )
  // console.log("CENTER ", center )

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
            center={newCenter ? newPlace : (center.lat ? center : defaultCenter)}
            zoom={10}
            onClick={mapClicked}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
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
            {locale?.map((lo, index) => (
              <Marker key={lo._id} 
              position={{ lat: lo.lat, lng: lo.lng }} 
              onClick={e=>markerClicked(lo, index)}
              onDragEnd={e=>markerDragEnd(e, index)}
              >
                 { (activeInfoWindow === index) &&
                <InfoWindow
                onLoad={onLoad}
                position={{ lat: lo.lat, lng: lo.lng }}
                >
                  <div>
                    <h2>Info</h2>
                    <p>Tittle: {lo.title}</p>
                    <p>Creator: {lo.creator}</p>
                    <p>Description: {lo.description}</p>
                  </div>
                </InfoWindow>
            }
              </Marker>
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
              <Box
              sx={{
                marginLeft:"15%",
                marginTop:"15%",
              }}
              noValidate
              autoComplete="off"
            >
               <FormControl sx={{
                backgroundColor:"#e0e0e0",
                opacity:"80%"
              }}>
                <TextField
                  label="Tittle: "
                  value={addTittle}
                  onChange={(e) => setAddTittle(e.target.value)}
                />
                {/* <Input label="User Name: " disabled="true" value={username} /> */}
                {/* <Input disabled="true" value={newLat} />
                <Input disabled="true" value={newLng} /> */}
                <TextField
                  label="Description: "
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                />
                <div className="button-container">
              <Button variant="contained" disabled={!token || addTittle === null || addDescription === null} onClick={handleAdding}>
                  Add Water Point
                </Button>
                <Button  
               sx={{
                display:"flex",
                justifyContent:"start"
              }}
              variant="contained" onClick={() => setAddLocation(false)}><CloseIcon/>Close</Button>
             </div>
              </FormControl>
              </Box>
            ) : null}
            {addSearch && !clickSomewhere && (
              <Box
              sx={{
                marginLeft:"15%",
                marginTop:"15%"
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl
              sx={{
                backgroundColor:"#e0e0e0"
              }}>
              
                <Button 
                 sx={{
                  display:"flex",
                  justifyContent:"start"
                }}
                variant="contained"
                onClick={() => setAddSearch(false)}><CloseIcon/>Close</Button>
                <TextField
                  label="Tittle: "
                  value={addTittle}
                  onChange={(e) => setAddTittle(e.target.value)}
                />
                <Input disabled="true" value={username} />
                <Input disabled="true" value={newLat} />
                <Input disabled="true" value={newLng} />
                <TextField
                  label="Description: "
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                />
                <Button  variant="contained" disabled={!token || addTittle === null || addDescription === null} onClick={handleAdding}>
                  Add Water Point
                </Button>
              </FormControl>
              </Box>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
