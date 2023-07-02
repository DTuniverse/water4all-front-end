import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BlogPage from "./pages/BlogPage";
import AddNewLocation from "./pages/AddNewLocation";
import Footer from "./components/Footer";
import { AuthContext } from "./context/authContext";
import "./App.css";
import MapPage from "./pages/MapPage";
import ShopPage from "./pages/ShopPage";
import BlogArticleFuture from "./pages/BlogArticleFuture";
import BlogArticleProtection from "./pages/BlogArticleProtection";
import BlogArticleEducation from "./pages/BlogArticleEducation";
import BlogArticleQuality from "./pages/BlogArticleQuality";

import LetterAvatars from "./components/LetterAvatars";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mappage" element={<MapPage />} />
        <Route path="/addnewlocation" element={<AddNewLocation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/shoppage" element={<ShopPage />} />
        <Route path="/articlefuture" element={<BlogArticleFuture />} />
        <Route path="/articleprotection" element={<BlogArticleProtection />} />
        <Route path="/articleeducation" element={<BlogArticleEducation />} />
        <Route path="/articlequality" element={<BlogArticleQuality />} />
        {/* <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
