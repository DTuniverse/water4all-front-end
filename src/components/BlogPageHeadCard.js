import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "../components/Cards.css";
import { Link } from 'react-router-dom';

export default function BlogPageHeadCard() {
    return(
        <Card sx={{  maxWidth: "345px", width: "100%", borderRadius: 8 }}>
        <CardContent>
            <h1 className='waterBlogH1'>TIPS FOR SAVING WATER</h1>
            <p className="missionP">
                Thirst for change: Unlocking the power of conservation to safeguard our most precious resource 
                - clean drinking water.
            </p>
            <CardMedia
                className='cardImage'
                component="img"
                alt="hands holding water"
                height="140"
                image={process.env.PUBLIC_URL + "/resources/handsholdingwater.svg"}
            />
        </CardContent>
    </Card>
    )
};