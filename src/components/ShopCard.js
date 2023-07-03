import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Slider from "react-slick";
import "./ShopCard.css";
import BuyModal from "../components/BuyModal";
export default function ShopCard() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="card-flex-container">
      <Card
        sx={{
          width: "100vw",
          height: "auto",
          minHeight: "400px",
          marginTop: "5px",
        }}
      >
        <div className="imgs-container">
          <Slider {...settings}>
            <div className="image-parent">
              <img
                src={process.env.PUBLIC_URL + "/resources/11.jpg"}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              ></img>
            </div>{" "}
            <div>
              <img
                className="image-parent"
                src={process.env.PUBLIC_URL + "/resources/22.webp"}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </div>{" "}
            <div>
              <img
                src={process.env.PUBLIC_URL + "/resources/33.webp"}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </div>{" "}
            <div>
              <img
                src={process.env.PUBLIC_URL + "/resources/44.webp"}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </div>
            <div>
              <img
                src={process.env.PUBLIC_URL + "/resources/55.webp"}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </div>
          </Slider>
        </div>
        <div
          className="flex-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            width: "auto",
            padding: "30px 0 10px 0",
          }}
        >
          <div className="buymodal-flex-container">
            <div style={{ textAlign: "center", width: "64px" }}>
              <p style={{ padding: "6px 8px", fontWeight: "bold" }}>10$</p>
            </div>
            <BuyModal />
          </div>
        </div>
        {/* <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
    </CardActions> */}
      </Card>
    </div>
  );
}

{
  /* <div className="imgs-container">
  <Slider {...settings}>
    <div className="image-parent">
      <img
        src={process.env.PUBLIC_URL + "/resources/11.jpg"}
        style={{
          width: "100vw",
          height: "auto",
        }}
      ></img>
    </div>{" "}
    <div>
      <img
        src={process.env.PUBLIC_URL + "/resources/22.webp"}
        style={{ width: "100vw", height: "auto" }}
      ></img>
    </div>{" "}
    <div>
      <img
        src={process.env.PUBLIC_URL + "/resources/33.webp"}
        style={{ width: "100vw", height: "auto" }}
      ></img>
    </div>{" "}
    <div>
      <img
        src={process.env.PUBLIC_URL + "/resources/44.webp"}
        style={{ width: "100vw", height: "auto" }}
      ></img>
    </div>
    <div>
      <img
        src={process.env.PUBLIC_URL + "/resources/55.webp"}
        style={{ width: "100vw", height: "auto" }}
      ></img>
    </div>
  </Slider>
</div>; */
}
