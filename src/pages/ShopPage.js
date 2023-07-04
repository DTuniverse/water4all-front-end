import "./ShopPage.css";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BuyModal from "../components/BuyModal";
import ShopCard from "../components/ShopCard";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

export default function ShopPage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   // adaptiveHeight: true,
  // };
  return (
    <div className="generalwrapper">
          <div className="shopPageFlexboxContainer">
            <ShopCard />
            <div>
              <h3
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  paddingTop: "50px",
                  paddingBottom: "25px",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  color: "#2669ba",
                }}
              >
                Why should you choose our bottle?
              </h3>
            </div>
            <Card sx={{
            width: "98vw",
            height: "auto",
            borderRadius: "20px"
            }} 
            elevation={3}>
              <CardContent>
                <h4>Support water access for everyone</h4>
                <br />
                <Typography 
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                  variant="body3" color="text.secondary">
                  By buying our branded bottles you support this site running and
                  make sure EVERYONE gets easy access to clean drinking water,
                  regardless of the individual challenges some might face.
                </Typography>
              </CardContent>
            </Card>
            <Card 
                sx={{
                width: "98vw",
                height: "auto",
                borderRadius: "20px",
                marginTop: "25px"
                }} 
                elevation={3} >
              <CardContent>
                <h4>UV Filter</h4>
                <br />
                <Typography 
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                  variant="body3" color="text.secondary">
                  Specially developed to be reusable and with a UV filter, which
                  protects water from light, guaranteeing its properties.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
                width: "98vw",
                height: "auto",
                borderRadius: "20px",
                marginTop: "25px"
                }} 
                elevation={3}>
              <CardContent>
                <h4>Premium materials</h4>
                <br />
                <Typography 
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                  variant="body3" color="text.secondary">
                  Aluminum keeps your drinks cold, does not leach harmful
                  chemicals, and doesn't risk a spill.
                </Typography>
              </CardContent>
            </Card>
            <Card 
            sx={{
              width: "98vw",
              height: "auto",
              borderRadius: "20px",
              marginTop: "25px"
              }} 
            elevation={3} >
              <CardContent>
                <h4>Environmental Advantages</h4>
                <br />
                <Typography 
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                  variant="body3" color="text.secondary">
                  Less emissions in the production of bottles. Less emissions in
                  the transport of bottles. Fewer bottles as waste in landfills.
                  Fewer bottles in the oceans. Reuse it more than once and you're
                  already saving the environment!
                </Typography>
              </CardContent>
            </Card>
            

            
          </div>
    </div>
  );
}
