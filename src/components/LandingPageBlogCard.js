import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../components/Cards.css";
import { Link } from 'react-router-dom';

export default function LandingPageBlogCard() {
    return(
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <h1>Water Blog</h1>
            <p className="missionP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua.
            </p>
        </CardContent>
        <CardActions>
        <div className="yellowButtonContainer">
            <Link to="/map" className="buttonLink">
                <button className="yellowButton">GO TO BLOG</button>
            </Link>
        </div>
        </CardActions>
    </Card>
    )
};