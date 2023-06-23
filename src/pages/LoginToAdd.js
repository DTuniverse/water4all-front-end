import React from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import "./Map.css";


function LoginToAdd() {
  return (
    <div>
        <h2>Please LOGIN TO ADD LOCATION</h2>
        <Login />

<h3>or signup if you don`t have account</h3>
    </div>
  )
}

export default LoginToAdd