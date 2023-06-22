import React, { useState, useEffect, useRef, useContext } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { FormControl, Input, InputLabel } from '@mui/material';


export default function MapPage()  {
   
    // const google = window.google;
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [newLat, setNewLat] = useState(null);
    const [newLng, setNewLng] = useState(null);
    const [locale, setLocale] = useState([]);
    const [addLocation, setAddLocation] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [addDescription, setAddDescription] = useState("");
    const [addTittle, setAddTittle] = useState("");
    const [user, setUser] = useState({});
    const [queryWord, setQueryWord] = useState("");
    const queryRef = useRef();
    const center = { lat: lat, lng: lng };
    const { token } = useContext(AuthContext);
    const { decodedToken } = useJwt(token);

    // console.log(`google ${google}`)

    // get user current location
    if (navigator.geolocation){
        navigator.geolocation.watchPosition((position)=>{
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
        })
      };

    // get exist water point
      const getNewLocation = async ()=>{
        try{
          const res = await fetch('https://water4all-backend.onrender.com/posts');
          const data = await res.json();
          setLocale(data.data)
          console.log(locale)
        }catch(err){
          console.log(err)
        }
      };
    
      useEffect(()=>{
        getNewLocation()
      },[]);  

     // search water location
     const handleSubmit = (e) => {
        e.preventDefault();
        // const search = new google.GoogleMap.places.SearchBox(queryWord);
        // GoogleMap.controls[google.GoogleMap.ControlPosition.TOP_LEFT].push(queryWord);
        // GoogleMap.addListener("bounds_changed", () => {
        // search.setBounds(GoogleMap.getBounds());
        //  });
     };


    const containerStyle = {
        width: "100%",
        height: "400px",
    }

    // get acurate address
    const getAddress = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = new window.google.maps.LatLng(lat, lng);
        const request = {
            latLng: latlng
        }
        return new Promise((resolve, reject) => {
            geocoder.geocode(request, results => {
                results?.length ? resolve(results[0].formatted_address) : reject(null);
            });
        })
    };
    
    // get click location
      const mapClicked =  async (event) => {
        console.log(event.latLng.lat(), event.latLng.lng());
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const address =  await getAddress(event.latLng.lat(), event.latLng.lng())
        console.log(address)
        setAddLocation(true);
        setNewLat(lat);
        setNewLng(lng);
    };
    console.log(`get or not? lat: ${newLat} lng: ${newLng} addLocation: ${addLocation}`);
    
    console.log(`token: ${token}`);
    console.log(`user : ${decodedToken}`);
   

   // add new location handler 
    const handleAdding = async(e)=>{
      e.preventDefault();
      let newPost = {
        title: addTittle,
        lat: newLat,
        lng: newLng,
        creator:user.username,
        description:addDescription,
        user_id: user._id,
      }
      try{
        const res = await fetch("https://water4all-backend.onrender.com/posts",{
          method:"POST",
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPost)
        });
        setAddLocation(false);
        setIsAdded(true);
      }catch(err){
        console.log(err)
      }
      };

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
        <>
        <Navbar />
        <h1>ADD NEW LOCATION</h1>
        
        <LoadScript 
        libraries={["places"]}
        googleMapsApiKey= {process.env.REACT_APP_MAP_API_KEY}>
        <div>
        <Autocomplete>
        <input value={queryWord} onChange={(e)=> setQueryWord(e.target.value)} ref={queryRef}/>
        </Autocomplete>
        <button onSubmit={handleSubmit} onClick={handleSubmit}>SEARCH</button>
        </div>
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={center} 
                zoom={15}
                onClick={mapClicked}
            >
            <Marker style={{width:"50px"}} position={center} />
            {locale?.map((lo)=> <Marker key={lo._id} position={{lat: lo.lat, lng: lo.lng}} />)}
            {addLocation?
              <FormControl>
                <button onClick={()=>setAddLocation(false)}>Close</button>
                <InputLabel  >Tittle: </InputLabel>
                <Input  value={addTittle} onChange={(e)=>setAddTittle(e.target.value)}/>
                <InputLabel  >Your Name:</InputLabel>
                <Input  disabled="true" value={user.username}/>
                <InputLabel  >Location: </InputLabel>
                <Input  disabled="true" value={newLat} />
                <Input  disabled="true" value={newLng} />
                <InputLabel  >Description: </InputLabel>
                <Input  value={addDescription} onChange={(e)=> setAddDescription(e.target.value)}/>
                <button onClick={handleAdding}>Add Water Point</button>
              </FormControl> : null
            }
           </GoogleMap>
        </LoadScript>
        <button>ADD NEW LOCATION</button>
        </>
    );
};


