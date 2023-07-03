import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function BlogPageQualityCard() {
    return (
        <Card elevation={3} sx={{ display: 'flex', borderRadius: 8 }}>
            <CardMedia
                component="img"
                alt="view at the water surface from underneath"
                height="150"
                image={process.env.PUBLIC_URL + "/resources/Protection.svg"}
                sx={{ flex: '0 0 auto', maxWidth: '140px' }}
            />
            <CardContent sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 className='blogCardH2'>PROTECTION</h2>
            </CardContent>
        </Card>
    );
}
