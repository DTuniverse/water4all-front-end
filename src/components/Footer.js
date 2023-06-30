import "./Footer.css";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useEffect } from "react";

export default function Footer() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="footer-component">
      <div className="flex-container-links">
        <NavLink to="/mappage" className="navlink" activeClassName="active">
          Water Finder
        </NavLink>
        <NavLink to="/blogpage" className="navlink" activeClassName="active">
          Water Blog
        </NavLink>
        <NavLink to="/shoppage" className="navlink" activeClassName="active">
          Water Shop
        </NavLink>
        <NavLink to="/" className="navlink" activeClassName="active">
          Home
        </NavLink>
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
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <a>
            <FacebookIcon fontSize="large" />
          </a>
        </div>
        <a>
          <TwitterIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}
