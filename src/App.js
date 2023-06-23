import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { AuthContext } from "./context/authContext";
import "./App.css";
import MapPage from "./pages/MapPage";
import LoginToAdd from "./pages/LoginToAdd";
import AddNewLocation from "./pages/AddNewLocation";





function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      {/* <MapPage /> */}
      <AddNewLocation />
      {/* <LoginToAdd /> */}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/mappage" element={<MapPage />}/>
        <Route path="/addnewlocation" element={<AddNewLocation />}/>
        <Route path="/logintoadd" element={<LoginToAdd />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
