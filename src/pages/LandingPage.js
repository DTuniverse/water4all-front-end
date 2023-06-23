import "../pages/LandingPage.css";
import React from "react";
import { Link } from 'react-router-dom';
import MapPage from './MapPage';
import LandingPageBlogCard from "../components/LandingPageBlogCard";
import LandingPageShopCard from "../components/LandingPageShopCard";
import Container from '@mui/material/Container';

export default function LandingPage () {
    return(
    <div>
        <h1>LOCATING FREE WATER SOURCES</h1>
        <p className="heroP">Start your Journey with us today and let´s make water accessible.
        {"\n"}
        One drop at a time.</p>
        <div className="blueButtonContainer">
        <Link to="/map" className="buttonLink">
            <button className="blueButton">Show Map ⛯</button>
        </Link>
        </div>
        <div>
            <img  className="heroImage" src={process.env.PUBLIC_URL + "/resources/Group 20 (1).svg"} 
            alt="Cartoon people working around a globe"/>
        </div>
        <h1 className="missionH1">OUR MISSION</h1>
        <p className="missionP">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.
        </p>
        <div>
            <img  className="missionImage" src={process.env.PUBLIC_URL + "/resources/Group 22@1x.svg"} 
            alt="A cartoon person holding a drop of water"/>
        </div>
        <h1 className="howH1">HOW WE DO IT</h1>
        <div>
            <img  className="howImage" src={process.env.PUBLIC_URL + "/resources/Group 19.svg"} 
            alt="A graphic of our values and goals"/>
        </div>
        <Container>
                <LandingPageBlogCard />
                <LandingPageShopCard />
        </Container>
    </div>    
    )
} ;

//↗