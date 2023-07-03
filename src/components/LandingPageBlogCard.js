import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import "../components/Cards.css";
import { Link } from 'react-router-dom';

export default function LandingPageBlogCard() {
    return(
    <Card elevation={3} sx={{  maxWidth: "345px", width: "100%", borderRadius: 8 }}>
        <CardContent>
            <h1 className='waterBlogH1'>WATER HUB</h1>
            <p className="missionP">
            Discover the fascinating world of water and explore its wonders with our insightful hub. 
            Dive into captivating articles, tips for conservation, and the latest discoveries in 
            water-related topics.
            </p>
        </CardContent>
        <CardActions>
        <div className="yellowButtonContainer">
            <Link to="/blogpage" className="buttonLink">  
                <button className="yellowButton">DIVE IN</button>
            </Link>
        </div>
        </CardActions>
    </Card>
    )
};

//minWidth: 275