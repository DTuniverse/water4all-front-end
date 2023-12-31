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
        elevation={3}
        sx={{
          width: "98vw",
          height: "auto",
          minHeight: "400px",
          marginTop: "15px",
          borderRadius: "20px"
        }}
      >
        <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              paddingTop: "20px",
              paddingBottom: "15px",
            }}
          >
            Owning a refillable bottle means you always have a drink with you,
            wherever you go.
          </p>
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
            padding: "30px 0 5px 0",
          }}
        >
          <div className="buymodal-flex-container">
            <div style={{ textAlign: "center", width: "64px" }}>
              <p style={{ padding: "6px 8px", fontWeight: "bold" }}>$10.00</p>
            </div>
            <BuyModal />
          </div>
        </div>
      </Card>
    </div>
  );
}
