import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <div>
      <div className="flex-container-links">
        <Link to="/mappage">Water Finder</Link>
        <Link to="/blogpage">Water Blog</Link>
        <Link to="/shoppage">Water Shop</Link>
      </div>
      <h2
        style={{
          textAlign: "center",
          color: "#2669ba",
          fontSize: "35px",
          marginTop: "72px",
          marginBottom: "20px",
        }}
      >
        CONTACT US:
      </h2>
      <div className="flex-container-links">
        <p>+1-415-555-0173</p>
        <p>water4all@npo.com</p>
      </div>
      <div className="flex-container-logos">
        <a>
          <TelegramIcon fontSize="large" />
        </a>
        <a>
          <FacebookIcon fontSize="large" />
        </a>
        <a>
          <TwitterIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}
