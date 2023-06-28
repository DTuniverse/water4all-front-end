import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // get user current location
  
   useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      // console.log("NAV GEO", position.coords.latitude)
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }); 
  }
}, []);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, lat, lng }}>
      {props.children}
    </AuthContext.Provider>
  );
}
