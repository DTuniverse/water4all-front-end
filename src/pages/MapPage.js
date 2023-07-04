import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { getLatLng } from "use-places-autocomplete";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Button, IconButton } from "@mui/material";
import "./Map.css";
import Card from "@mui/material/Card";

//
import AddNewLocationModal from "../components/AddNewLocationModal";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { Transform } from "@mui/icons-material";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import MyLocationIcon from "@mui/icons-material/MyLocation";

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
  const { lat, lng } = useContext(AuthContext);
  const [currentZoom, setCurrentZoom] = useState(10);
  const center = { lat: lat, lng: lng };
  const defaultCenter = { lat: 52.519432315072166, lng: 13.401147636877893 };
  const libraries = ["places", "streetView"];
  const [goBack, setGoBack] = useState(false);

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
    getNewLocation();
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
      setGoBack(false);
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
    setGoBack(false);
  };
  console.log(`get or not? lat: ${newLat} lng: ${newLng} `);

  const containerStyle = {
    width: "100vw",
    height: "75vh",
    // borderRadius: "10px",
    // border: "3px solid #2669ba ",
  };

  const markerClicked = (lo, index) => {
    setActiveInfoWindow(index);
    console.log(lo, "index" + index);
    setClickMarker(true);
    setClickSomewhere(false);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };

  const handleGoBack = () => {
    setGoBack(true);
  };
  console.log(`go back ${goBack}`);
  console.log(`zoom: ${currentZoom}`);
  // console.log(Boolean(center.lat))

  return (
    <div>
      {/* <h2>WATER FINDER</h2> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          elevation={3}
          style={{ marginTop: "10px", borderRadius: "20px", width: "98vw" }}
        >
          <div className="mapcontainer">
            <LoadScript
              libraries={libraries}
              googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                  goBack
                    ? { lat: lat, lng: lng }
                    : clickSomewhere
                    ? { lat: newLat, lng: newLng }
                    : newCenter
                    ? newPlace
                    : center.lat
                    ? center
                    : defaultCenter
                }
                zoom={currentZoom}
                // onCenterChanged={handleZoom}
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
                    placeholder="Search"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `200px`,
                      maxWidth: "400px",
                      height: `40px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "10px",
                      opacity: "90%",
                    }}
                  />
                </StandaloneSearchBox>
                <IconButton
                  onClick={handleGoBack}
                  style={{
                    position: "absolut",
                    marginLeft: "210px",
                    marginTop: "10px",
                  }}
                >
                  <MyLocationIcon />
                </IconButton>
                <Marker
                  icon={process.env.PUBLIC_URL + "/resources/person.png"}
                  position={center}
                />
                {locale?.map((lo, index) => (
                  <Marker
                    key={lo._id}
                    position={{ lat: lo.lat, lng: lo.lng }}
                    onClick={(e) => markerClicked(lo, index)}
                    onDragEnd={(e) => markerDragEnd(e, index)}
                    icon={process.env.PUBLIC_URL + "/resources/mdi_drop.svg"}
                  >
                    {activeInfoWindow === index && !clickSomewhere && (
                      <InfoWindow
                        onLoad={onLoad}
                        position={{ lat: lo.lat, lng: lo.lng }}
                      >
                        <div>
                          <h2>Info</h2>
                          {lo.url ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={lo.url}
                                alt={lo.title}
                                style={{ width: "200px" }}
                              />
                            </div>
                          ) : null}
                          <p>Tittle: {lo.title}</p>
                          <p>Creator: {lo.creator}</p>
                          <p>Address: {lo?.address}</p>
                          <p>Description: {lo.description}</p>
                          <a
                            className="google-link"
                            href={`https://www.google.com/maps?z=12&t=m&q=loc:${lo.lat}+${lo.lng}`}
                          >
                            {" "}
                            Search on GoogleMap
                          </a>
                          {lo.verified != true ? (
                            <Button disabled="true">Not Verified</Button>
                          ) : (
                            <Button>Verified</Button>
                          )}
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
                {/* {newCenter && !clickSomewhere && <Marker position={newPlace} />}
          {clickSomewhere && (
            <Marker position={{ lat: newLat, lng: newLng }} />
          )} */}
              </GoogleMap>
            </LoadScript>
          </div>
        </Card>

        {token !== null && (
          <Card
            elevation={3}
            sx={{ marginTop: "10px", borderRadius: "20px", width: "98vw" }}
          >
            <p
              style={{
                textAlign: "center",
                paddingBottom: "0",
                color: "#2669ba",
                fontWeight: "bold",
              }}
            >
              Spread water throughout your community{" "}
              <Diversity1Icon
                style={{
                  position: "relative",
                  top: "5px",
                }}
              />
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "0",
              }}
            >
              <div style={{ padding: "10px" }}>
                <Link to="/addnewlocation">
                  <Button
                    style={{
                      width: "auto",
                      height: "40px",
                    }}
                    variant="outlined"
                  >
                    <AddLocationAltRoundedIcon />
                    add new water point
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
        {token === null && (
          <Card
            elevation={3}
            sx={{ marginTop: "10px", borderRadius: "20px", width: "98vw" }}
          >
            <div>
              {" "}
              <p
                style={{
                  textAlign: "center",
                  paddingBottom: "0",
                  color: "#2669ba",
                  fontWeight: "bold",
                }}
              >
                Spread water throughout your community{" "}
                <Diversity1Icon
                  style={{
                    position: "relative",
                    top: "5px",
                  }}
                />
              </p>
            </div>
            <AddNewLocationModal />
          </Card>
        )}
      </div>
    </div>
  );
}
