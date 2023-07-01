import React, { useState, useEffect, useRef, useContext } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { getLatLng } from "use-places-autocomplete";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Button } from "@mui/material";
import "./Map.css";

//
import AddNewLocationModal from "../components/AddNewLocationModal";
import IconButton from "@mui/material/IconButton";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { Transform } from "@mui/icons-material";

//

export default function MapPage() {
  // const google = window.google;
  const [clickMarker, setClickMarker] = useState(false);
  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [newCenter, setNewCenter] = useState(false);
  const [value, setValue] = useState("");
  const [locale, setLocale] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const { token } = useContext(AuthContext);
  const [clickSomewhere, setClickSomewhere] = useState(false);
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);
  const { lat, lng,  } = useContext(AuthContext);
  const [currentZoom, setCurrentZoom] = useState(10);
  const center = { lat: lat, lng: lng };
  const defaultCenter = { lat: 52.519432315072166, lng: 13.401147636877893 };
  const libraries = ["places", "streetView"];

// get all added locations 
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
getNewLocation()
}, []);

  // google search bar
  const searchBoxRef = useRef(null);
  const onLoad = (ref) => {
    searchBoxRef.current = ref;
  };
  const onPlacesChanged = async () => {
    try {
      const places = await searchBoxRef.current?.getPlaces();
      console.log(`ref: ${searchBoxRef.current}`);
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
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const address = await getAddress(event.latLng.lat(), event.latLng.lng());
    console.log(address);
    setNewLat(newLat);
    setNewLng(newLng);
    setClickSomewhere(true);
    setCurrentZoom(15);
  };
  console.log(`get or not? lat: ${newLat} lng: ${newLng} `);


  const containerStyle = {
    width: "90%",
    height: "450px",
  };

  const markerClicked = (lo, index) => {
    setActiveInfoWindow(index);
    console.log(lo, "index" + index);
    setClickMarker(true);
    setClickSomewhere(false);
  };


  const markerDragEnd = (event, index) => {
      console.log(event.latLng.lat())
      console.log(event.latLng.lng())
  };
  
  const handleZoom = () => {
    setCurrentZoom(15);
  };
 console.log(`zoom: ${currentZoom}`)
  // console.log(Boolean(center.lat))



  return (
    <div>
      <h2>WATER FINDER</h2>
      <div className="mapcontainer">
        <LoadScript
          libraries={libraries}
          googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={clickSomewhere ? {lat: newLat, lng: newLng} : newCenter ? newPlace : (center.lat ? center : defaultCenter )}
            zoom={currentZoom}
            onCenterChanged={handleZoom}
            onClick={mapClicked}
            options={{
              mapTypeControl: false,
              streetViewControl: true,
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
            <Marker icon={process.env.PUBLIC_URL + '/resources/person.png'} position={center}/>
            {locale?.map((lo, index) => (
              <Marker key={lo._id} 
              position={{ lat: lo.lat, lng: lo.lng }} 
              onClick={e=>markerClicked(lo, index)}
              onDragEnd={e=>markerDragEnd(e, index)}
              icon={process.env.PUBLIC_URL + '/resources/mdi_drop.svg'}
              >
                 { (activeInfoWindow === index) && !clickSomewhere &&
                <InfoWindow
                onLoad={onLoad}
                position={{ lat: lo.lat, lng: lo.lng }}
                >
                  <div>
                    <h2>Info</h2>
                    <p>Tittle: {lo.title}</p>
                    <p>Creator: {lo.creator}</p>
                    <p>Address: {lo?.address}</p>
                    <p>Description: {lo.description}</p>
                    <a className="google-link" href={`https://www.google.com/maps?z=12&t=m&q=loc:${lo.lat}+${lo.lng}`}> Search on GoogleMap</a>
                    {lo.verified != true ? <Button disabled="true">Not Verified</Button> : <Button>Verified</Button>}
                  </div>
                </InfoWindow>
            }
              </Marker>
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
