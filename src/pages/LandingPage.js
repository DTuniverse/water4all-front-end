import "../pages/LandingPage.css";
import React from "react";
import { Link } from 'react-router-dom';
import MapPage from './MapPage';
import Container from '@mui/material/Container';
import LandingPageBlogCard from "../components/LandingPageBlogCard";
import LandingPageShopCard from "../components/LandingPageShopCard";

export default function LandingPage() {
  return (
    <div>
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
          <button className="blueButton">SHOW MAP ⛯</button>
        </Link>
        </div>
        <div>
            <img  className="heroImage" src={process.env.PUBLIC_URL + "/resources/Group 20 (1).svg"} 
            alt="Cartoon people working around a globe"/>
        </div>
        <div className="ourMission">
            <h1 className="missionH1">OUR MISSION</h1>
            <div className="missionPContainer">
                <span className="missionP">Our mission is to ensure easy access to</span> 
                <span className="missionP">clean drinking water for everyone.</span>
                <span className="missionP">Through our interactive map, we provide</span>
                <span className="missionP">locations of drinking fountains, restaurants,</span> 
                <span className="missionP">cafés and other places where people can</span>
                <span className="missionP">find free drinking water. </span>
                <span className="missionP">YOU can contribute by adding more places</span>
                <span className="missionP">and ratings to the existing ones.</span>
            </div>
        </div>
        <div>

            <img  className="missionImage" src={process.env.PUBLIC_URL + "/resources/Group 22@1x.svg"} 
            alt="A cartoon person holding a drop of water"/>
        </div>
        <h1 className="howH1">HOW WE DO IT</h1>
        <div>
            <img  className="howImage" src={process.env.PUBLIC_URL + "/resources/Group 19.svg"} 
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
    )
} ;