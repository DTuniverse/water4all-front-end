import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../components/Cards.css";
import { Link } from 'react-router-dom';

export default function ImgMediaCard() {
return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
            <h1>WATER SHOP</h1>
            <CardMedia
                component="img"
                alt="a hand holding a bottle"
                height="140"
                image={process.env.PUBLIC_URL + "/resources/shop.svg"}
            />
            <p className="missionP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                abore et dolore magna aliqua.
            </p>
        </CardContent>
        <CardActions>
            <div className="yellowButtonContainer">
                <Link to="/map" className="buttonLink">
                    <button className="yellowButton">SHOP NOW</button>
                </Link>
            </div>
        </CardActions>
    </Card>
);
}