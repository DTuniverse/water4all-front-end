import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'


function LoginToAdd() {
  return (
    <div>
        <Navbar />
        <h1>Please LOGIN TO ADD LOCATION</h1>
        <Login />

<h3>or signup if you don`t have account</h3>
    </div>
  )
}

export default LoginToAdd