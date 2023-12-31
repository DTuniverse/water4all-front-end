import "../pages/LandingPage.css";
import React from "react";
import { Link } from "react-router-dom";
import MapPage from "./MapPage";
import Container from "@mui/material/Container";
import LandingPageBlogCard from "../components/LandingPageBlogCard";
import LandingPageShopCard from "../components/LandingPageShopCard";

export default function LandingPage() {
  return (
    <div className="mainC">
      <div className="landingCenterinator">
      <div className="landingHeadlineContainer">
        <span className="landingHeadline">LOCATING FREE</span>
        <span className="landingHeadline"> WATER SOURCES</span>
      </div>
      <div className="heroPContainer">
        <span className="heroP">Start your Journey with us today</span>
        <span className="heroP"> and let´s make water accessible.</span>
        <span className="heroP">One drop at a time.</span>
      </div>
      <div className="blueButtonContainer">
        <Link to="/mappage" className="buttonLink">
          <button className="blueButton">SHOW MAP</button>
        </Link>
      </div>
        <div>
            <img  className="heroImage" src={process.env.PUBLIC_URL + "/resources/Group 20 (1).svg"} 
            alt="Cartoon people working around a globe"/>
        </div>
            <div className="missionH1Container">
              <h1 className="missionH1" style={{ textAlign: "left" }}>OUR MISSION</h1>
            </div>
            <div className="missionPLandingContainer">
              <p className="missionPLanding">
                Our mission is to ensure easy access to clean drinking water for everyone.
                Through our interactive map, we provide locations of 
                drinking fountains, restaurants, cafés and other places 
                where people can find free drinking water.
                <br />
                YOU can contribute by adding more places and ratings to the existing ones.
              </p>
        </div>
        <div>

            <img  className="missionImage" src={process.env.PUBLIC_URL + "/resources/Group 22@1x.svg"} 
            alt="A cartoon person holding a drop of water"/>
        </div>
        <h1 className="howH1">HOW WE DO IT</h1>
        <div>
            <img  className="howImage" src={process.env.PUBLIC_URL + "/resources/HowWeDoItNew.svg"} 
            alt="A graphic of our values and goals"/>
        </div>
            <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="cardWrapper" >
                        <LandingPageBlogCard />
                    </div>
                    <div  className="cardWrapper">
                        <LandingPageShopCard />
                    </div>
            </Container>
      </div>
    </div>    
    )
} ;