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
        <Link to="/map" className="buttonLink">
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
                <span className="missionP">Our mission is to ensure easy access to clean</span> 
                <span className="missionP">drinking water for everyone. Through our</span>
                <span className="missionP">interactive map, we provide locations of</span>
                <span className="missionP">drinking fountains, restaurants, cafés, and</span> 
                <span className="missionP">other places where people can find free</span>
                <span className="missionP">drinking water. </span>
                <span className="missionP">YOU can contribute by adding more places and</span>
                <span className="missionP">rating the existing ones.</span>
                <span className="missionP">Our Goal is to raise awareness about</span> 
                <span className="missionP">the significance of clean drinking water,</span>
                <span className="missionP">hygiene, and sanitation.</span>
                <span className="missionP">Join us in creating a world where clean water is</span>
                <span className="missionP">accessible to all.</span>
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

//↗
// style={{ marginBottom: '20px' }}