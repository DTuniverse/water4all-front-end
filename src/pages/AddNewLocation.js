import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { Button, FormControl, Box, Input, TextField, Switch, FormControlLabel, Modal, Checkbox, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Map.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Add } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function AddNewLocation() {
  // const google = window.google;
  const [activeInfoWindow, setActiveInfoWindow] = useState(false);
  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);
  const [address, setAddress] = useState(null);
  const [locale, setLocale] = useState([]);
  const [addLocation, setAddLocation] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [addDescription, setAddDescription] = useState(null);
  const [addTittle, setAddTittle] = useState(null);
  const [username, setUsername] = useState("");
  const [searchAddress, setSearchAddress] = useState(" ");
  const [newCenter, setNewCenter] = useState(false);
  const [value, setValue] = useState("");
  const [newPlace, setNewPlace] = useState(null);
  const [addSearch, setAddSearch] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(10);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [clickSomewhere, setClickSomewhere] = useState(false);
  const { lat, lng } = useContext(AuthContext);
  const center = { lat: lat, lng: lng };
  const defaultCenter = { lat: 52.519432315072166, lng: 13.401147636877893 };
  const libraries = ["places", "streetView"];
  const [imgUrl, setImgUrl] = useState(null);
  const [wantPhoto, setWantPhoto] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [ pleaseSelect, setPleaseSelect ] = useState(false);
  const [ pleaseRefresh, setPleaseRefresh ] = useState(false);
  const [ AddedLocation, setAddedLocation] = useState([]);
  const [ goAdded, setGoAdded] = useState(false);
  const [AddedLat, setAddedLat] = useState(null);
  const [addedLng, setAddedLng] = useState(null);
  const [checked, setChecked] = useState(true);

  // upload photo for new post
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setOpen(true);
    setWantPhoto(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //upload photo
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", image, image.name);
      //(field, state image, file name)
      console.log(`formData ${formData}`);
      let res = await fetch(
        "https://water4all-backend.onrender.com/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      setUploaded(true);
      setError(false);
      handleUrl();
      setPhotoAdded(true);
    } catch (err) {
      setError(err);
    }
  };

  const fileData = () => {
    if (image) {
      return (
        <h5>
          <em>{image.name}</em>
        </h5>
      );
      return null;
    }
  };

  // google search bar
  const searchBoxRef = useRef(null);
  const onLoad = (ref) => {
    searchBoxRef.current = ref;
    console.log(`ref: ${ref}`);
  };

  const onPlacesChanged = async () => {
    try {
      const places = await searchBoxRef.current.getPlaces();
      console.log(`place: ${places[0]}`);
      const result = getLatLng(places[0]);
      setClickSomewhere(false);
      setNewCenter(true);
      setNewPlace(result);
      setValue("");
      setAddSearch(true);
      setUsername(decodedToken?.name);
      setNewLat(result.lat);
      setNewLng(result.lng);
      setAddLocation(false);
      setWantPhoto(false);
      setUploaded(false);
      setPhotoAdded(false);
      setCurrentZoom(15);
      setActiveInfoWindow(false);
      setGoBack(false);
      setGoAdded(false);
      console.log(`new lat: ${newLat}`);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: result.lat, lng: result.lng } },
        (results) => {
          if (results?.length) {
            setSearchAddress(results[0].formatted_address);
          }
        }
      );
      console.log(`searchAddress: ${searchAddress}`);
    } catch (error) {
      console.error("Error retrieving places", error.message);
      if(error.message === "Cannot read properties of undefined (reading 'geometry')"){
        setPleaseSelect(true);
      };
      if(error.message === "searchBoxRef.current.getPlaces is not a function"){
        setPleaseRefresh(true);
      }
    }
  };

  // put center to new added location
  // useEffect(()=>{
  //   const goAddedLocation = async() => {
  //     try{
  //       const res = await fetch("https://water4all-backend.onrender.com/posts");
  //       const data = await res.json();
  //       setAddedLocation(data);
  //       console.log(` goAddedLocation ${AddedLocation}`);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }; 
  //   goAddedLocation();
  // },[goAdded])

  // get exist water point
  const getNewLocation = async () => {
    console.log("get new location running");
    try {
      const res = await fetch("https://water4all-backend.onrender.com/posts");
      const data = await res.json();
      setLocale(data.data);
      console.log(locale);
      setAddedLat(data.data.slice(-1)[0].lat);
      setAddedLng(data.data.slice(-1)[0].lng);
      setGoAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNewLocation();
  }, [isAdded]);

  const containerStyle = {
    width: "100vw",
    height: "75vh",
    // borderRadius: "10px",
    // border: "3px solid #2669ba ",
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
    console.log("MAP CLICKED", lat, lng);
    const address = await getAddress(event.latLng.lat(), event.latLng.lng());
    setAddress(address);
    setAddLocation(true);
    setAddSearch(false);
    setIsAdded(false);
    setNewLat(lat);
    setNewLng(lng);
    setUsername(decodedToken?.name);
    setClickSomewhere(true);
    setCurrentZoom(15);
    setAddDescription(null);
    setAddTittle(null);
    setWantPhoto(false);
    setUploaded(false);
    setImage(false);
    setPhotoAdded(false);
    setActiveInfoWindow(false);
    setGoBack(false);
    setGoAdded(false);
  };
  console.log(
    `get or not? lat: ${newLat} lng: ${newLng} addLocation: ${addLocation} `,
    typeof newLat
  );
  console.log(`address: ${address}`);
  console.log(`token: ${token}`);
  console.log(`username : ${decodedToken?._id}`);

  // picture URL
  const handleUrl = async () => {
    try {
      const res = await fetch(
        "https://water4all-backend.onrender.com/api/image"
      );
      const data = await res.json();
      const imageUrl = data.image.slice(-1)[0].url;
      setImgUrl(imageUrl);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(`imgUrl ${imgUrl}`);

  // add new location handler
  const handleAdding = async (e) => {
    // e.preventDefault();
    let newPost = {
      title: addTittle,
      lat: newLat,
      lng: newLng,
      creator: decodedToken?.name,
      description: addDescription,
      address: address,
      user_id: decodedToken?._id,
      url: imgUrl,
    };

    console.log("CONSOLE LOG NEW POST", newPost);
    try {
      const res = await fetch("https://water4all-backend.onrender.com/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      console.log(`res: ${res.type}`);
      setAddLocation(false);
      setAddSearch(false);
      setIsAdded(true);
      setAddTittle(null);
      setAddDescription(null);
      setImgUrl(null);
      setWantPhoto(false);
      setImage(false);
      setGoAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    setAddLocation(false);
    setAddSearch(false);
    console.log(marker, index);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };

  const handleGoBack = () => {
    setGoBack(true);
    setCurrentZoom(15);
  };
console.log(`goBack ${goBack}`)

  console.log(`zoom: ${currentZoom}`);
  // console.log(`description: ${addDescription}`)
  // console.log("NEWCENTER ", newCenter )
  // console.log("NEWPLACE ", newPlace )
  // console.log("CENTER ", center )
  console.log(`isAdded ${isAdded}`);

  

  const handleChange = (event) => {
    setChecked(true);
  };

  return (
    <>
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
            center={ goAdded ? { lat: newLat, lng: newLng } : goBack ? {lat:lat, lng:lng} : addLocation? {lat: newLat, lng: newLng} : newCenter ? newPlace : center.lat ? center : defaultCenter}
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
            {pleaseSelect? <Snackbar
                open={pleaseSelect}
                anchorOrigin={ {horizontal: 'center', vertical: 'top'} }
                autoHideDuration={3000}
                onClose={() => setPleaseSelect(false)}
              >
                <Alert onClose={() => setPleaseSelect(false)} severity="error">
                  Please Select Location from List!
                </Alert>
              </Snackbar> : 
              pleaseRefresh ? <Snackbar
              open={pleaseRefresh}
              anchorOrigin={ {horizontal: 'center', vertical: 'top'} }
              autoHideDuration={3000}
              onClose={() => setPleaseRefresh(false)}
            >
              <Alert onClose={() => setPleaseRefresh(false)} severity="error">
               Something Went Wrong, Please Refresh Page!
              </Alert>
            </Snackbar> : isAdded? <Snackbar
                // anchorOrigin={{ vertical, horizontal }}
                open={isAdded}
                autoHideDuration={3000}
                anchorOrigin={ {horizontal: 'center', vertical: 'top'} }
                onClose={() => setIsAdded(false)}
              >
                <Alert onClose={() => setIsAdded(false)} severity="success">
                 Location Added Successfully!
                </Alert>
              </Snackbar> : null
                }
            <IconButton onClick={handleGoBack} style={{position:"absolut", marginLeft:"210px", marginTop:"10px" }}>
              <MyLocationIcon/>
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
                icon={
                  process.env.PUBLIC_URL + "/resources/mdi_drop.svg"
                }
              >
                {activeInfoWindow === index && (
                  <InfoWindow
                    onLoad={onLoad}
                    position={{ lat: lo.lat, lng: lo.lng }}
                  >
                    <div>
                      <h2 style={{margin:"10px"}}>Information</h2>
                      {lo.url? <div style={{ display:"flex", justifyContent:"center"}}><img src={lo.url} alt={lo.title} style={{width:"200px", borderRadius:"10px"}}/></div> : null}
                      {lo.verified != true ? (
                        <FormControlLabel disabled control={<Checkbox />} label="Not Verified" />
                      ) : (
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} defaultChecked />} label="Verified" />
                      )}
                      <div style={{width:"200px", height:"200px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                      <p><strong>Tittle: </strong>{lo.title}</p>
                      <p><strong>Creator: </strong>{lo.creator}</p>
                      <p><strong>Description: </strong>{lo.description}</p>
                      <p><strong>Address: </strong>{lo.address}</p>
                      <a
                        className="google-link"
                        href={`https://www.google.com/maps?z=12&t=m&q=loc:${lo.lat}+${lo.lng}`}
                      >
                        {" "}
                        Search on GoogleMap
                      </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
            {newCenter && !clickSomewhere && (
              <Marker onClick={() => setAddSearch(true)} position={newPlace} />
            )}
            {addLocation && !addSearch && (
              <Marker
                onClick={() => setAddLocation(true)}
                position={{ lat: newLat, lng: newLng }}
              />
            )}
            {addLocation && (
              <Box
                position="absolute"
                bottom="23px"
                left="10px"
                width="200px"
                noValidate
                autoComplete="off"
              >
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    opacity: "90%",
                  }}
                >
               
                  <input
                    onChange={(e) => setAddTittle(e.target.value)}
                    value={addTittle}
                    type="text"
                    placeholder="Name / Type"
                    style={{
                      width: `200px`,
                      height: `60px`,
                      padding: `0 12px`,
                      margin: "0",
                      borderRadius: `3px`,

                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                        }}
                      />
                      {/* <TextField
                    label="Name/Type: "
                    value={addTittle}
                    onChange={(e) => setAddTittle(e.target.value)}
                    inputProps={{
                      style: {
                        height: "40px",
                        padding: "0 12px",
                      },
                    }}
                  /> */}
                      {/* <Input label="User Name: " disabled="true" value={username} /> */}
                      {/* <Input disabled="true" value={newLat} />
                <Input disabled="true" value={newLng} /> */}
                      <TextField
                        label="Address: "
                        value={address}
                        disabled="true"
                        inputProps={{
                          style: {
                            height: "32px",
                            padding: "0 10px",
                            background: "transparent",
                            fontSize: "14px",
                          },
                        }}
                        maxRows={2}
                        variant="filled"
                        multiline
                      />
                      <input
                        onChange={(e) => setAddDescription(e.target.value)}
                        value={addDescription}
                        type="text"
                        placeholder="Description"
                        style={{
                          width: `200px`,
                          height: `60px`,
                          padding: `0 12px`,
                          margin: "0",
                          borderRadius: `3px`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                        }}
                      />
                      {photoAdded ? (
                        <FormControlLabel
                          style={{ display: "flex", justifyContent: "center" }}
                          control={<Checkbox defaultChecked />}
                          disabled
                          label="Photo Added"
                        />
                      ) : (
                        <Button
                          style={{ height: "60px" }}
                          startIcon={<AddPhotoAlternateIcon />}
                          onClick={handleOpen}
                        >
                          Add Photo
                        </Button>
                      )}
                      {wantPhoto ? (
                        <div>
                          <Modal
                            open={open}
                            onClose={uploaded && handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box sx={{ ...style, width: "80vw" }}>
                              <div>
                                <h2
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Upload Image
                                </h2>
                                <form onSubmit={onSubmit}>
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        onChange={(e) =>
                                          setImage(e.target.files[0])
                                        }
                                        className="custom-file-input"
                                        id="image"
                                      />

                                      <label
                                        style={{
                                          fontSize: "smaller",
                                          marginBottom: "30px",
                                          marginLeft: "10px",
                                        }}
                                        htmlFor="image"
                                      >
                                        {image ? fileData() : "Choose File"}
                                      </label>
                                    </div>
                                  </div>
                                  <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <Button
                                      style={{ fontSize: "16px" }}
                                      onClick={handleClose}
                                      color="error"
                                    >
                                      <CloseIcon />
                                      Close
                                    </Button>
                                    {/* <Button
                                      sx={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                      variant="contained"
                                      color="error"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button> */}
                                    <Button
                                      variant="contained"
                                      onClick={onSubmit}
                                    >
                                      Upload
                                    </Button>
                                  </div>
                                  {uploaded ? (
                                    <p
                                      style={{
                                        marginTop: "30px",
                                        fontSize: "smaller",
                                      }}
                                    >
                                      Upload Successfully!!!
                                    </p>
                                  ) : error ? (
                                    <div className="text-danger">
                                      An error occurred uploading the file
                                    </div>
                                  ) : null}
                                </form>
                              </div>
                              {/* <FormControlLabel required disabled={!uploaded} control={<Switch onChange={handleUrl} />} label="Photo Added" /> */}
                            </Box>
                          </Modal>
                        </div>
                      ) : null}

                      {/* <TextField
                    label="Description: "
                    value={addDescription}
                    onChange={(e) => setAddDescription(e.target.value)}
                    inputProps={{
                      style: {
                        height: "40px",
                        padding: "0 12px",
                      },
                    }}
                    variant="filled"
                  /> */}
                      <div className="button-container">
                        <Button
                          style={{
                            width: "60px",
                            height: "60px",
                            lineHeight: "40px",
                          }}
                          variant="contained"
                          color="error"
                          onClick={() => setAddLocation(false)}
                        >
                          <CloseIcon />
                        </Button>
                        <Button
                          style={{
                            width: "136px",
                            height: "60px",
                            lineHeight: "40px",
                          }}
                          variant="contained"
                          color="success"
                          disabled={
                            !token ||
                            addTittle === null ||
                            addDescription === null
                          }
                          onClick={handleAdding}
                        >
                          <AddLocationAltRoundedIcon />
                          Add
                        </Button>
                      </div>
                    </FormControl>
                  </Box>
                )}
                {addSearch && !clickSomewhere && (
                  <Box
                    position="absolute"
                    bottom="23px"
                    left="10px"
                    width="200px"
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl
                      sx={{
                        backgroundColor: "white",
                        opacity: "90%",
                      }}
                    >
                      <input
                        onChange={(e) => setAddTittle(e.target.value)}
                        value={addTittle}
                        type="text"
                        placeholder="Name / Type"
                        style={{
                          width: `200px`,
                          height: `60px`,
                          padding: `0 12px`,
                          margin: "0",
                          borderRadius: `3px`,

                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                        }}
                      />
                      {/* <TextField
                    label="Tittle: "
                    value={addTittle}
                    onChange={(e) => setAddTittle(e.target.value)}
                  /> */}
                      <TextField
                        label="Address: "
                        value={searchAddress}
                        disabled="true"
                        inputProps={{
                          style: {
                            height: "32px",
                            padding: "0 12px",
                            background: "transparent",
                            fontSize: "14px",
                          },
                        }}
                        maxRows={2}
                        variant="filled"
                        multiline
                      />
                      <input
                        onChange={(e) => setAddDescription(e.target.value)}
                        value={addDescription}
                        type="text"
                        placeholder="Description"
                        style={{
                          width: `200px`,
                          height: `60px`,
                          padding: `0 12px`,
                          margin: "0",
                          borderRadius: `3px`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                        }}
                      />

                      {photoAdded ? (
                        <FormControlLabel
                          style={{ display: "flex", justifyContent: "center" }}
                          control={<Checkbox defaultChecked />}
                          disabled
                          label="Photo Added"
                        />
                      ) : (
                        <Button
                          style={{ height: "60px" }}
                          startIcon={<AddPhotoAlternateIcon />}
                          onClick={handleOpen}
                        >
                          Add Photo
                        </Button>
                      )}
                      {wantPhoto ? (
                        <div>
                          <Modal
                            open={open}
                            onClose={uploaded && handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box sx={{ ...style, width: "80vw" }}>
                              <div>
                                <h2
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Upload Image
                                </h2>
                                <form onSubmit={onSubmit}>
                                  <div className="form-group">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        onChange={(e) =>
                                          setImage(e.target.files[0])
                                        }
                                        className="custom-file-input"
                                        id="image"
                                      />

                                      <label
                                        style={{
                                          fontSize: "smaller",
                                          marginBottom: "30px",
                                          marginLeft: "10px",
                                        }}
                                        htmlFor="image"
                                      >
                                        {image ? fileData() : "Choose File"}
                                      </label>
                                    </div>
                                  </div>

                                  <Button
                                    sx={{
                                      marginLeft: "10px",
                                      marginRight: "10px",
                                    }}
                                    variant="contained"
                                    color="error"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={onSubmit}
                                  >
                                    Upload
                                  </Button>

                                  {uploaded ? (
                                    <p
                                      style={{
                                        marginTop: "30px",
                                        fontSize: "smaller",
                                      }}
                                    >
                                      Upload Successfully!!!
                                    </p>
                                  ) : error ? (
                                    <div className="text-danger">
                                      An error occurred uploading the file
                                    </div>
                                  ) : null}
                                </form>
                              </div>
                              {/* <FormControlLabel required disabled={!uploaded} control={<Switch onChange={handleUrl} />} label="Photo Added" /> */}
                            </Box>
                          </Modal>
                        </div>
                      ) : null}

                      {/* <TextField
                    label="Description: "
                    value={addDescription}
                    onChange={(e) => setAddDescription(e.target.value)}
                  /> */}
                      <div className="button-container">
                        <Button
                          style={{
                            width: "60px",
                            height: "60px",
                            lineHeight: "40px",
                          }}
                          variant="contained"
                          color="error"
                          onClick={() => setAddSearch(false)}
                        >
                          <CloseIcon />
                        </Button>
                        <Button
                          style={{
                            width: "136px",
                            height: "60px",
                            lineHeight: "40px",
                          }}
                          variant="contained"
                          color="success"
                          disabled={
                            !token ||
                            addTittle === null ||
                            addDescription === null
                          }
                          onClick={handleAdding}
                        >
                          <AddLocationAltRoundedIcon />
                          Add
                        </Button>
                      </div>
                      {/* <Button
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    variant="contained"
                    onClick={() => setAddSearch(false)}
                  >
                    <CloseIcon />
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    disabled={
                      !token || addTittle === null || addDescription === null
                    }
                    onClick={handleAdding}
                  >
                    Add Water Point
                  </Button> */}
                    </FormControl>
                  </Box>
                )}
              </GoogleMap>
            </LoadScript> 
          </div>
        </Card>
        <Card
          elevation={3}
          sx={{ marginTop: "10px", borderRadius: "20px", width: "98vw" }}
        >
          <div>
            {/* <img
          style={{
            position: "relative",
            top: "40px",
            left: "40px",
            rotate: "270deg",
          }}
          src={process.env.PUBLIC_URL + "/resources/Ellipse 5ellipse10.png"}
        ></img> */}
            <p
              style={{
                textAlign: "center",
                paddingTop: "15px",
                color: "#2669ba",
                fontWeight: "bold",
              }}
            >
              To add a new water point please tap
              <TouchAppOutlinedIcon
                style={{
                  position: "relative",
                  top: "2px",
                }}
              />
              on the map or use search bar to look for the required location.
            </p>
            <br />
          </div>
        </Card>
      </div>
    </>
  );
}
