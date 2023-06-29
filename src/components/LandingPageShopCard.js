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
    <Card sx={{  maxWidth: "345px", width: "100%", borderRadius: 8 }} >
        <CardContent>
            <h1 className='waterShopH1'>WATER SHOP</h1>
            <p className="missionP">
            Discover our exclusive collection of water-inspired merchandise in our online shop, 
            where every purchase contributes to our mission of bringing clean water to those in need.
            </p>
        </CardContent>
        <CardActions>
            <div className="yellowButtonContainer">
                <Link to="/shoppage" className="buttonLink"> 
                    <button className="yellowButton">SHOP NOW</button>
                </Link>
            </div>
        </CardActions>
    </Card>
);
}