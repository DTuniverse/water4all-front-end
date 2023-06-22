import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import { Link, Navigate } from "react-router-dom";

export default function MapPage()  {
   
    // const google = window.google;
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [locale, setLocale] = useState([]);
    const center = { lat: lat, lng: lng };
    const [queryWord, setQueryWord] = useState("");
    const queryRef = useRef();

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


    const mapClicked = (event) => { 
        console.log(event.latLng.lat(), event.latLng.lng()) 
    }
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
        <h1>WATER FINDER</h1>
        
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
            </GoogleMap>
        </LoadScript>
        <button>ADD NEW LOCATION</button>
        </>
    );
};


